#!/bin/bash

if command -v udevadm >/dev/null 2>&1 ; then
  echo "Updating udev rules"
  udevadm control --reload-rules && udevadm trigger
fi

echo "Updating ldconfig"
cat << EOF > /etc/ld.so.conf.d/meshsdk_libs.conf
/usr/local/lib/MeshSDK
/usr/local/lib/MeshSDK/lib
EOF
ldconfig
