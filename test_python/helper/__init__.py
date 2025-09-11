import os
import sys

import pytest

working_directory = str()
# insert 0 to find mrpy.so in working directory and not in system
if (
    "MeshLibPyModulesPath" in os.environ
    and not os.environ["MeshLibPyModulesPath"] in sys.path
):
    sys.path.insert(0, os.environ["MeshLibPyModulesPath"])
    working_directory = os.environ["MeshLibPyModulesPath"]

import meshsdk.mrmeshpy as mrmesh
import meshsdk.mrmeshnumpy as mrmeshnumpy

# Check if we're using the bindings of meshsdk v3.*
is_bindings_v3 = True
try:
    mrmesh.UniformSamplingSettings
except AttributeError:
    is_bindings_v3 = False
