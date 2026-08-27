#!/bin/sh

# Xcode Cloud: corre justo antes de xcodebuild.
# Refuerza NODE_BINARY porque el PATH de ci_post_clone no se hereda.

set -e
set -x

export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_ENV_HINTS=1
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

BREW_PREFIX="$(brew --prefix 2>/dev/null || echo /opt/homebrew)"
export PATH="${BREW_PREFIX}/opt/node@20/bin:${BREW_PREFIX}/bin:${PATH}"

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
