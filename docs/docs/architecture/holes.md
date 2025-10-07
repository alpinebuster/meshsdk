# 孔洞填充实现细节

在 MeshTopology 中，孔洞由只有一个邻接面的边（裸边）定义。函数 `MeshTopology::findHoleRepresentiveEdges()` 来找出每个孔洞的代表边（返回一个 `EdgeId` 列表）。然后对这些边循环调用 `MR::fillHole(mesh, edge, params)`，该函数根据边界顶点自动生成一组三角形来填充孔洞。其内部流程大致是：首先从给定边出发沿孔洞边界形成多边形链，接着根据填充策略将该多边形三角化。填充策略由参数 `FillHoleParams` 控制，例如 `maxPolygonSubdivisions`（默认20）限制多边形细分的最大深度，而 `FillHoleMetric` 可用来评价三角形质量。最终，新生成的三角形被加入到 `MeshTopology` 中，消除原有的孔洞开口。简单示例代码：

```cpp
auto holeEdges = mesh.topology.findHoleRepresentiveEdges();
for (EdgeId e : holeEdges) {
    FillHoleParams params;
    // 可调整 params.metric、params.maxPolygonSubdivisions 等
    MR::fillHole(mesh, e, params);
}
```

如上所示，`fillHole` 会修改网格拓扑，补全孔洞区域。
