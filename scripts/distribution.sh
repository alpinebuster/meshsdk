#!/bin/bash

# This script creates `*.deb` packages with built thirdparty and project libs
# usage: first argument - `v1.2.3.4` - version with "v" prefix,
# ./distribution.sh v1.2.3.4

# exit if any command failed
set -eo pipefail

if [ ! -f "./lib/libcpr.so" ]; then
  echo "Thirdparty build was not found. Building..."
  ./scripts/build_thirdparty.sh
fi

if [ ! -f "./build/Release/bin/libMRMesh.so" ]; then
  echo "Project release build was not found. Building..."
  export MESHSDK_BUILD_RELEASE="ON"
  export MESHSDK_BUILD_DEBUG="OFF"
  ./scripts/build_source.sh
fi

#create distr dirs
if [ -d "./distr/" ]; then
 rm -rf distr
fi

cmake --install ./build/Release --prefix "./distr/meshsdk-dev/usr/local"

MR_INSTALL_LIB_DIR="/usr/local/lib/MeshSDK"
MR_INSTALL_INCLUDE_DIR="/usr/local/include/MeshSDK"
MR_INSTALL_RES_DIR="/usr/local/share/MeshSDK"

# Install the generated bindings, if needed.
if [ ! -f "distr/meshsdk-dev$MR_INSTALL_LIB_DIR/meshsdk/mrmeshpy.so" ] && [ -f "build/Release/bin/meshsdk/mrmeshpy.so" ]; then
  echo "Installing the generated bindings..."
  install -Dt "distr/meshsdk-dev$MR_INSTALL_LIB_DIR/meshsdk" build/Release/bin/meshsdk/{mrmeshpy.so,mrmeshnumpy.so,__init__.py}
  install -Dt "distr/meshsdk-dev$MR_INSTALL_LIB_DIR"         build/Release/bin/meshsdk/{mrmeshpy.so,mrmeshnumpy.so,__init__.py}
  patchelf --set-rpath '' "distr/meshsdk-dev$MR_INSTALL_LIB_DIR/"{,meshsdk/}mrmeshpy.so

  if [ -f "build/Release/bin/meshsdk/mrcudapy.so" ]; then
    echo "CUDA bindings found, installing with mrcudapy.so..."
    install -Dt "distr/meshsdk-dev$MR_INSTALL_LIB_DIR/meshsdk" build/Release/bin/meshsdk/mrcudapy.so
    install -Dt "distr/meshsdk-dev$MR_INSTALL_LIB_DIR"         build/Release/bin/meshsdk/mrcudapy.so
    patchelf --set-rpath '' "distr/meshsdk-dev$MR_INSTALL_LIB_DIR/"{,meshsdk/}mrcudapy.so
  fi
fi

MR_VERSION="0.0.0.0"
if [ "${1}" ]; then
  MR_VERSION="${1:1}"
fi
echo ${MR_VERSION} > distr/meshsdk-dev${MR_INSTALL_RES_DIR}/mr.version

BASE_DIR=$(realpath $(dirname "$0")/..)
REQUIREMENTS_FILE="${BASE_DIR}/requirements/ubuntu.txt"
# convert multi-line file to comma-separated string
DEPENDS_LINE=$(cat ${REQUIREMENTS_FILE} | tr '\n' ',' | sed -e "s/,\s*$//" -e "s/,/, /g")

#create control file
mkdir -p distr/meshsdk-dev/DEBIAN
cat << EOF > ./distr/meshsdk-dev/DEBIAN/control
Package: meshsdk-dev
Essential: no
Priority: optional
Section: model
Maintainer: Adalisk team
Architecture: all
Description: Advanced mesh modeling library
Version: ${MR_VERSION}
Depends: ${DEPENDS_LINE}
EOF

cp "./scripts/preinstall_trick.sh" ./distr/meshsdk-dev/DEBIAN/preinst
chmod +x ./distr/meshsdk-dev/DEBIAN/preinst

cp "./scripts/postinstall.sh" ./distr/meshsdk-dev/DEBIAN/postinst
chmod +x ./distr/meshsdk-dev/DEBIAN/postinst

mkdir -p ./distr/meshsdk-dev/usr/local/lib/udev/rules.d/
cp "./scripts/70-space-mouse-meshsdk.rules" ./distr/meshsdk-dev/usr/local/lib/udev/rules.d/

#copy lib dir
CURRENT_DIR="`pwd`"
cp -rL ./lib "${CURRENT_DIR}/distr/meshsdk-dev${MR_INSTALL_LIB_DIR}/"
cp -rL ./include "${CURRENT_DIR}/distr/meshsdk-dev${MR_INSTALL_INCLUDE_DIR}/"
echo "Thirdparty libs and include copy done"

#call dpkg
cd distr
dpkg-deb --build -Zxz ./meshsdk-dev

if [ -f "./meshsdk-dev.deb" ]; then
  echo "Dev deb package has been built."
else
  echo "Failed to build dev.deb package!"
  exit 8
fi
