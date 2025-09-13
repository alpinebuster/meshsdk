import os
import sys

import pytest

working_directory = str()
# insert 0 to find mrpy.so in working directory and not in system
if (
    "MeshSDKPyModulesPath" in os.environ
    and not os.environ["MeshSDKPyModulesPath"] in sys.path
):
    sys.path.insert(0, os.environ["MeshSDKPyModulesPath"])
    working_directory = os.environ["MeshSDKPyModulesPath"]

import meshsdk.mrmeshpy as mrmesh
import meshsdk.mrmeshnumpy as mrmeshnumpy

# Check if we're using the bindings of meshsdk v3.*
is_bindings_v3 = True
try:
    mrmesh.UniformSamplingSettings
except AttributeError:
    is_bindings_v3 = False
