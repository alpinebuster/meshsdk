# Implementation Details of Hole Filling

In `MeshTopology`, holes are defined by edges that have only a single adjacent face (naked edges). The function `MeshTopology::findHoleRepresentiveEdges()` identifies the representative edges of each hole, returning a list of `EdgeId`s. Subsequently, `MR::fillHole(mesh, edge, params)` is called in a loop for these edges; this function automatically generates a set of triangles to fill the hole based on boundary vertices. The internal process can be summarized as follows: it begins by forming a polygonal chain along the boundary of the hole starting from the given edge, and then triangulates this polygon according to the filling strategy. This strategy is controlled by the parameters in `FillHoleParams`, such as `maxPolygonSubdivisions` (default value of 20), which limits the maximum depth of polygon subdivision, and `FillHoleMetric`, which can be used to evaluate triangle quality. Ultimately, the newly generated triangles are incorporated into `MeshTopology`, effectively eliminating the original openings of the hole. A simple example code is as follows:

```cpp
auto holeEdges = mesh.topology.findHoleRepresentiveEdges();
for (EdgeId e : holeEdges) {
    FillHoleParams params;
    // Parameters like `params.metric` and `params.maxPolygonSubdivisions` can be adjusted
    MR::fillHole(mesh, e, params);
}
```

As illustrated, `fillHole` modifies the mesh topology, completing the hole regions.
