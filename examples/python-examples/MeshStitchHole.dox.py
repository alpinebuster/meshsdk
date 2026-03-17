import meshsdk.mrmeshpy as mrmeshpy

# Load meshes
mesh_a = mrmeshpy.loadMesh("../_assets/maxilla.stl")
mesh_b = mrmeshpy.loadMesh("../_assets/mandible.stl")

# Unite meshes
mesh = mrmeshpy.mergeMeshes([mesh_a, mesh_b])

# Find holes
edges = mesh.topology.findHoleRepresentiveEdges()

# Connect two holes
params = mrmeshpy.StitchHolesParams()
params.metric = mrmeshpy.getUniversalMetric(mesh)
mrmeshpy.stitchHoles(mesh, edges[0], edges[1], params)

# Save result
mrmeshpy.saveMesh(mesh, "stitchedMesh.stl")
