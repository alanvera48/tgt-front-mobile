#!/bin/sh

# Xcode Cloud: corre después de clonar el repo, antes del Archive.
# Docs: https://developer.apple.com/documentation/xcode/writing-custom-build-scripts

set -e
set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_ENV_HINTS=1
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
# Xcode 26 CI: evita linker errors swiftCompatibility5x (MetalToolchain).
export TOOLCHAINS=com.apple.dt.toolchain.XcodeDefault

echo "===== Homebrew / Node / CocoaPods ====="
brew install node@20 cocoapods

# Xcode Cloud puede usar /opt/homebrew o /usr/local
BREW_PREFIX="$(brew --prefix)"
export PATH="${BREW_PREFIX}/opt/node@20/bin:${BREW_PREFIX}/bin:${PATH}"

# Si node@20 no quedó linkeado, forzar el path del keg
if ! command -v node >/dev/null 2>&1; then
  brew link node@20 --force --overwrite || true
  export PATH="${BREW_PREFIX}/opt/node@20/bin:${PATH}"
fi

node -v
npm -v
pod --version

# xcodebuild NO hereda el PATH de este script. Hay que fijar NODE_BINARY
# en .xcode.env.local y dejar un symlink donde los scripts de RN lo busquen.
NODE_BIN="$(command -v node)"
echo "export NODE_BINARY=${NODE_BIN}" > "${CI_PRIMARY_REPOSITORY_PATH}/ios/.xcode.env.local"
mkdir -p /usr/local/bin 2>/dev/null || true
ln -sf "${NODE_BIN}" /usr/local/bin/node 2>/dev/null || true
# Persistencia para shells que lean estos perfiles
{
  echo "export PATH=\"${BREW_PREFIX}/opt/node@20/bin:${BREW_PREFIX}/bin:\$PATH\""
  echo "export NODE_BINARY=\"${NODE_BIN}\""
} >> "${HOME}/.zprofile"
{
  echo "export PATH=\"${BREW_PREFIX}/opt/node@20/bin:${BREW_PREFIX}/bin:\$PATH\""
  echo "export NODE_BINARY=\"${NODE_BIN}\""
} >> "${HOME}/.bash_profile"
echo "NODE_BINARY=${NODE_BIN}"

cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "===== env files (no van en git) ====="
# Los schemes leen .env / .env.development; en Cloud no existen.
# Preferí la variable de entorno de Xcode Cloud si está definida.
if [ ! -f .env ]; then
  if [ -n "${REACT_APP_BASE_URL:-}" ]; then
    printf 'REACT_APP_BASE_URL=%s\n' "${REACT_APP_BASE_URL}" > .env
  elif [ -f .env.example ]; then
    cp .env.example .env
  else
    printf 'REACT_APP_BASE_URL=http://localhost:8080\n' > .env
  fi
fi
[ -f .env.development ] || cp .env .env.development
[ -f .env.production ] || cp .env .env.production

echo "===== npm install ====="
npm install --legacy-peer-deps

echo "===== fix boost download (checksum flaky en CDN) ====="
# CocoaPods a veces descarga basura/HTML desde archives.boost.io y falla el sha256.
# Bajamos el tarball nosotros, verificamos el hash y apuntamos el podspec a file://.
BOOST_EXPECTED_SHA="f0397ba6e982c4450f27bf32a2a83292aba035b827a5623a14636ea583318c41"
BOOST_CACHE_DIR="${CI_PRIMARY_REPOSITORY_PATH}/ios/.boost-cache"
BOOST_TGZ="${BOOST_CACHE_DIR}/boost_1_76_0.tar.bz2"
BOOST_PODSPEC="${CI_PRIMARY_REPOSITORY_PATH}/node_modules/react-native/third-party-podspecs/boost.podspec"

mkdir -p "$BOOST_CACHE_DIR"

download_boost() {
  url="$1"
  attempt="$2"
  echo "boost download attempt ${attempt}: ${url}"
  rm -f "$BOOST_TGZ"
  if ! curl -L --fail --retry 3 --retry-delay 2 --connect-timeout 30 \
    --max-time 300 -o "$BOOST_TGZ" "$url"; then
    return 1
  fi
  got="$(shasum -a 256 "$BOOST_TGZ" | awk '{print $1}')"
  echo "boost sha256=${got}"
  if [ "$got" = "$BOOST_EXPECTED_SHA" ]; then
    return 0
  fi
  echo "boost checksum mismatch (expected ${BOOST_EXPECTED_SHA})"
  rm -f "$BOOST_TGZ"
  return 1
}

BOOST_OK=0
i=1
for url in \
  "https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2" \
  "https://sourceforge.net/projects/boost/files/boost/1.76.0/boost_1_76_0.tar.bz2/download"
do
  if download_boost "$url" "$i"; then
    BOOST_OK=1
    break
  fi
  i=$((i + 1))
done

if [ "$BOOST_OK" != "1" ]; then
  echo "ERROR: could not download boost 1.76.0 with the expected checksum"
  exit 1
fi

# Apuntar el podspec al archivo local verificado (evita re-download corrupto).
export BOOST_PODSPEC
export BOOST_TGZ
python3 <<'PY'
import os
from pathlib import Path

podspec = Path(os.environ["BOOST_PODSPEC"])
boost_uri = Path(os.environ["BOOST_TGZ"]).resolve().as_uri()
text = podspec.read_text()
replacements = [
    "https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2",
    "https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2",
]
patched = False
for old in replacements:
    if old in text:
        text = text.replace(old, boost_uri)
        patched = True
if not patched and "file://" not in text:
    raise SystemExit(f"boost.podspec URL not found to patch: {podspec}")
podspec.write_text(text)
print(f"patched boost.podspec -> {boost_uri}")
PY

# Limpiar cache externo de boost por si quedó basura de un intento previo.
rm -rf "${HOME}/Library/Caches/CocoaPods/Pods/External/boost" || true

echo "===== pod install ====="
cd ios

# Xcode Cloud a menudo timeout-ea el CDN de CocoaPods (raw.githubusercontent.com).
# Menos paralelismo + reintentos evitan el falso negativo.
export COCOAPODS_DISABLE_STATS=true
export GIT_HTTP_MAX_REQUESTS=1

pod_install_with_retries() {
  max=6
  n=1
  delay=20
  while [ "$n" -le "$max" ]; do
    echo "pod install attempt ${n}/${max}"
    if pod install; then
      echo "pod install OK on attempt ${n}"
      return 0
    fi
    echo "pod install failed (typical Xcode Cloud CocoaPods CDN timeout)"
    # A mitad de los reintentos, recrear el spec repo CDN por si quedó a medias.
    if [ "$n" -eq 3 ]; then
      echo "resetting CocoaPods trunk CDN repo"
      pod repo remove trunk >/dev/null 2>&1 || true
    fi
    n=$((n + 1))
    if [ "$n" -le "$max" ]; then
      echo "retrying in ${delay}s..."
      sleep "$delay"
      delay=$((delay + 15))
    fi
  done
  return 1
}

if ! pod_install_with_retries; then
  echo "ERROR: pod install failed after retries (CocoaPods CDN / GitHub)"
  exit 1
fi

echo "===== strip Hermes bitcode (App Store Connect lo rechaza) ====="
if [ -f scripts/strip-hermes-bitcode.sh ]; then
  bash scripts/strip-hermes-bitcode.sh || true
fi

echo "===== ci_post_clone OK ====="
