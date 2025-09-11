from meshsdk import mrmeshpy as mm
import math
import os

base_dir = os.path.dirname(__file__)
meshA_path = os.path.abspath(os.path.join(base_dir, "..", "_assets", "mandible-binary.stl"))
meshB_path = os.path.abspath(os.path.join(base_dir, "..", "_assets", "maxilla-binary.stl"))

# Load and combine the meshes
meshA = mm.loadMesh(meshA_path)
meshB = mm.loadMesh(meshB_path)

# combine meshes
mesh = mm.Mesh()
mesh.addMesh(meshA)
mesh.addMesh(meshB)

# flip normals
mesh.topology.flipOrientation()

avgEdgeLength = mesh.averageEdgeLength()  # store it for future subdivision

# prepare guidelines (circular for simplicity)
holes = mesh.topology.findHoleRepresentiveEdges()
assert holes.size() == 2
box = mesh.computeBoundingBox()
center = box.center()
radius = box.diagonal() * 0.5
# Z axis is known to be occlusal?
numGuides = 5  # play with range to get better result
for i in range(numGuides):
    zRatio = float(i + 1) / float(numGuides + 1)
    zLevel = box.min.z * (1.0 - zRatio) + box.max.z * zRatio
    points = mm.Contour3f()
    points.resize(200 + 1)
    for j in range(points.size() - 1):
        angle = math.pi * 2 * j / (points.size() - 1)
        points[j].x = center.x + radius * math.cos(angle)
        points[j].y = center.y + radius * math.sin(angle)
        points[j].z = zLevel
    points[points.size() - 1] = points[0]  # close points
    loopId = mesh.addSeparateEdgeLoop(points)
    holes.insert(holes.size() - 1, loopId.sym())
    holes.insert(holes.size() - 1, loopId)

# stitch holes
sParams = mm.StitchHolesParams()
sParams.metric = mm.getCircumscribedMetric(mesh)
oldFaces = mesh.topology.getValidFaces()
for i in range(int(holes.size() / 2)):
    mm.buildCylinderBetweenTwoHoles(mesh, holes[i * 2], holes[i * 2 + 1], sParams)

# post process
# newFaces = mesh.topology.getValidFaces() - oldFaces
# sSettings = mm.SubdivideSettings()
# sSettings.maxEdgeLen = avgEdgeLength * 5
# sSettings.maxEdgeSplits = 1000000  # big number not to stop early
# sSettings.region = newFaces
# mm.subdivideMesh(mesh, sSettings)

# vertRegion = mm.getIncidentVerts(mesh.topology, newFaces)
# mm.shrink(mesh.topology, vertRegion, 3)

# mm.positionVertsSmoothly(mesh, vertRegion, mm.EdgeWeights.Cotan, mm.VertexMass.NeiArea)

result_path = os.path.abspath(os.path.join(base_dir, "MeshFillHoleWithSimpleGuidelines.stl"))
mm.saveMesh(mesh, result_path)
