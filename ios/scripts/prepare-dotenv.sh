#!/bin/sh
# Prepares react-native-config generated files for an Xcode build.
# The Ruby generator writes GeneratedInfoPlistDotEnv.h into BUILD_DIR,
# which does not exist yet during Clean / first build.

set -e

ENV_FILE="${1:-.env}"

if [ -z "${BUILD_DIR}" ]; then
  echo "prepare-dotenv: BUILD_DIR is not set; skipping"
  exit 0
fi

mkdir -p "${BUILD_DIR}"

if [ -n "${CONFIGURATION_BUILD_DIR}" ] && [ -n "${INFOPLIST_PATH}" ]; then
  rm -f "${CONFIGURATION_BUILD_DIR}/${INFOPLIST_PATH}"
fi

echo "${ENV_FILE}" > /tmp/envfile

DOTENV_RB="${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildDotenvConfig.rb"
if [ ! -f "${DOTENV_RB}" ]; then
  echo "prepare-dotenv: BuildDotenvConfig.rb not found at ${DOTENV_RB}"
  exit 1
fi

"${DOTENV_RB}" "${SRCROOT}/.." "${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig"
