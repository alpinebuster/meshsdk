# 🕸️ Mesh Issues and Fixes

There are a variety of issues that may be present in a mesh:

* small components
* disconnected vertices
* degenerate faces
* multiple edges
* self-intersections
* holes

> ⚠️ Non-manifoldness is already fixed on load or construct, so it cannot be an issue here.

## 🔹 Small components

```python
# remove small components first
area = mesh.area()
bigComps = mm.MeshComponents.getLargeByAreaComponents(mesh, area * 0.002, None)
mesh.deleteFaces(mesh.topology.getValidFaces() - bigComps)
```

---

## 🔹 Disconnected vertices

(from `test_python/test_meshBuilder.py`, line 77 in 09b543e)

```python
mrmesh.uniteCloseVertices(mesh, 0)
```

---

## 🔹 Degenerate faces

```python
tolerance = mesh.computeBoundingBox().diagonal() * 1e-2

degFaces = mm.findDegenerateFaces(mesh, 1e3)
shortEdges = mm.findShortEdges(mesh, tolerance * 1e-2)
degFaces |= mm.getIncidentFaces(mesh.topology, shortEdges)
mm.expand(mesh.topology, degFaces, 3)

dSettings = mm.DecimateSettings()
dSettings.strategy = mm.DecimateStrategy.ShortestEdgeFirst
dSettings.maxError = tolerance * 0.1
dSettings.criticalTriAspectRatio = 1e3
dSettings.tinyEdgeLength = tolerance * 1e-2
dSettings.stabilizer = mm.ResolveMeshDegenSettings().stabilizer
dSettings.optimizeVertexPos = False
dSettings.region = degFaces
dSettings.maxAngleChange = mm.ResolveMeshDegenSettings().maxAngleChange

mm.decimateMesh(mesh, dSettings)
```

---

## 🔹 Multiple edges

```python
# just find them
multipleEdges = mm.findMultipleEdges(mesh.topology)

# fix possible multiple edges
mm.fixMultipleEdges(mesh)
```

---

## 🔹 Self-intersections

```python
# remove self-intersections
selfIntersSettings = mm.SelfIntersections.Settings()
selfIntersSettings.method = mm.SelfIntersections.Settings.Method.CutAndFill
selfIntersSettings.maxExpand = 2
selfIntersSettings.relaxIterations = 2

mm.SelfIntersections.fix(mesh, selfIntersSettings)
```

---

## 🔹 Holes

```python
# fill all holes if needed
for e in mesh.topology.findHoleRepresentiveEdges():
    mm.fillHole(mesh, e)
```

---

## 🔹 One-shot fix (voxel rebuild)

There is also a single function that fixes holes, self-intersections, multiple edges, and most degenerations (though it may leave some small components):

```python
params = mm.RebuildMeshSettings()
params.voxelSize = mm.suggestVoxelSize(mesh, 5e6)
params.fwn = mc.FastWindingNumber(mesh)  # Enables CUDA (mc = `from meshsdk import mrcudapy as mc`)
mesh = mm.rebuildMesh(mesh, params)
```
