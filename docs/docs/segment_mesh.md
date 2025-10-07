# Segment Mesh

Segment the mesh using the 2 Point method (Teeth Segmentation with Segment Mesh Tool).

## Methods

In general the idea there is to build "Surrounding Contour" around picked pointes and then separate its "left" part with respect to possible tunnels.

Also it might be worth mentioning that we use this metric for contouring:

`asmesh/source/MRMesh/MREdgeMetric.h`

Lines 32 to 37 in f3c4381

```cpp
/// returns edge's metric that depends both on edge's length and on the angle between its left and right faces 
/// \param angleSinFactor multiplier before dihedral angle sine in edge metric calculation (positive to prefer concave angles, negative - convex) 
/// \param angleSinForBoundary consider this dihedral angle sine for boundary edges; 
/// this metric is symmetric: m(e) == m(e.sym()) 
[[nodiscard]] MRMESH_API EdgeMetric edgeCurvMetric( const Mesh & mesh, float angleSinFactor = 2, float angleSinForBoundary = 0 ); 
[[nodiscard]] MRMESH_API EdgeMetric edgeCurvMetric( const MeshTopology& topology, const VertCoords& points, float angleSinFactor = 2, float angleSinForBoundary = 0 ); 
```
