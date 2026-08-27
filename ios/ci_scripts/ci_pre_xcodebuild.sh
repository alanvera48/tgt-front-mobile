#!/bin/sh

# Xcode Cloud: corre justo antes de xcodebuild.
# Refuerza NODE_BINARY porque el PATH de ci_post_clone no se hereda.

set -e
set -x

export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_ENV_HINTS=1
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
# Xcode 26 CI: fuerza toolchain default (faltan libs swiftCompatibility* con MetalToolchain).
export TOOLCHAINS=com.apple.dt.toolchain.XcodeDefault

BREW_PREFIX="$(brew --prefix 2>/dev/null || echo /opt/homebrew)"
export PATH="${BREW_PREFIX}/opt/node@20/bin:${BREW_PREFIX}/bin:${PATH}"

# Best-effort: exponer libs de compatibilidad Swift al SDK si el runner las oculta.
fix_swift_compat_libs() {
  toolchain_root="$(xcrun --find swift 2>/dev/null | sed 's|/usr/bin/swift||')"
  sdk_path="$(xcrun --show-sdk-path --sdk iphoneos 2>/dev/null || true)"
  if [ -z "$toolchain_root" ] || [ -z "$sdk_path" ]; then
    echo "ci_pre_xcodebuild: skip swift compat symlinks (paths missing)"
    return 0
  fi
  dest_dir="${sdk_path}/usr/lib/swift"
  mkdir -p "$dest_dir" 2>/dev/null || true
  for lib in \
    swiftCompatibility50 \
    swiftCompatibility51 \
    swiftCompatibility56 \
    swiftCompatibilityConcurrency \
    swiftCompatibilityDynamicReplacements
  do
    src="${toolchain_root}/usr/lib/swift/iphoneos/lib${lib}.a"
    dst="${dest_dir}/lib${lib}.a"
    if [ -f "$src" ] && [ ! -e "$dst" ]; then
      ln -sf "$src" "$dst" 2>/dev/null || true
      echo "ci_pre_xcodebuild: linked ${lib}"
    fi
  done
}
fix_swift_compat_libs

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: node not found before xcodebuild"
  exit 1
fi

NODE_BIN="$(command -v node)"
echo "export NODE_BINARY=${NODE_BIN}" > "${CI_PRIMARY_REPOSITORY_PATH}/ios/.xcode.env.local"
mkdir -p /usr/local/bin 2>/dev/null || true
ln -sf "${NODE_BIN}" /usr/local/bin/node 2>/dev/null || true

echo "ci_pre_xcodebuild: NODE_BINARY=${NODE_BIN}"
node -v
