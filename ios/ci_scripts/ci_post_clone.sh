#!/bin/sh

# Xcode Cloud: corre después de clonar el repo, antes del Archive.
# Docs: https://developer.apple.com/documentation/xcode/writing-custom-build-scripts

set -e
set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

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

cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "===== npm install ====="
npm install --legacy-peer-deps

echo "===== pod install ====="
cd ios
pod install

echo "===== strip Hermes bitcode (App Store Connect lo rechaza) ====="
if [ -f scripts/strip-hermes-bitcode.sh ]; then
  bash scripts/strip-hermes-bitcode.sh || true
fi

echo "===== ci_post_clone OK ====="
