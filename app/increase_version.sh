#!/usr/bin/env bash -e

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

node ./android_increase_build_version.js
./ios_increase_build_version.sh

git add "./android/app/build.gradle"
git add "./ios/parkspot/Info.plist"
git add "./package.json"

git tag ${PACKAGE_VERSION}
