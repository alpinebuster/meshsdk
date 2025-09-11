import meshsdk.mrmeshpy as mrmeshpy
import sys

# Load mesh
try:
    mesh = mrmeshpy.loadMesh("../_assets/mesh.stl")
except ValueError as e:
    print(e)
    sys.exit(1)

# Save mesh
try:
    mrmeshpy.saveMesh(mesh, "../_assets/mesh.ply")
except ValueError as e:
    print(e)
    sys.exit(1)

