#!/bin/bash

# This script installs requirements by `brew` if not already installed

BASEDIR=$(dirname $(realpath "$0"))
MESHSDK_BREW_REQUIREMENTS=$(cat "$BASEDIR"/../requirements/macos.txt)
if [ -n "$MESHSDK_EXTRA_BREW_REQUIREMENTS" ] ; then
  MESHSDK_BREW_REQUIREMENTS=$MESHSDK_BREW_REQUIREMENTS$'\n'$MESHSDK_EXTRA_BREW_REQUIREMENTS
fi

brew install $(echo "$MESHSDK_BREW_REQUIREMENTS" | tr '\n' ' ')

brew install pybind11

# check and upgrade python3 pip
python3.10 -m ensurepip --upgrade
python3.10 -m pip install --upgrade pip

# install requirements for python libs
python3.10 -m pip install -r requirements/python.txt

exit 0
