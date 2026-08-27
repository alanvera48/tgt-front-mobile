#!/bin/sh

# Xcode Cloud corre este script automáticamente después de clonar el repo,
# antes de resolver dependencias de Xcode. node_modules y Pods no están
# commiteados, así que hay que instalarlos acá.
# Docs: https://developer.apple.com/documentation/xcode/writing-custom-build-scripts

set -e
set -x

echo "Instalando Node..."
brew install node@20
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
node -v
npm -v

cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "Instalando dependencias de npm..."
npm install --legacy-peer-deps

echo "Instalando CocoaPods..."
gem install cocoapods --no-document

echo "Instalando Pods..."
cd ios
pod install
