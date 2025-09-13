import os
import sys

# insert 0 to find mrpy.so in working directory and not in system
if "MeshSDKPyModulesPath" in os.environ and not os.environ["MeshSDKPyModulesPath"] in sys.path:
    sys.path.insert(0, os.environ["MeshSDKPyModulesPath"])

import meshsdk.mrmeshpy as mrmeshpy
import meshsdk.mrmeshnumpy as mrmeshnumpy

# Check if we're using the new parsed bindings.
is_new_binding = True
try:
    mrmeshpy.UniformSamplingSettings
except AttributeError:
    is_new_binding = False
