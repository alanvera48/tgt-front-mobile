#!/bin/sh
# Apple rejects TestFlight/App Store uploads if Hermes still contains bitcode.
# Strip it from every hermes binary we can find under ios/Pods.

set -e

IOS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STRIP="$(xcrun --find bitcode_strip)"

find "$IOS_DIR/Pods/hermes-engine" -name hermes -type f 2>/dev/null | while read -r bin; do
  if otool -l "$bin" 2>/dev/null | grep -q '__LLVM'; then
    echo "strip-hermes-bitcode: stripping $bin"
    "$STRIP" -r "$bin" -o "$bin"
  else
    echo "strip-hermes-bitcode: already clean $bin"
  fi
done
