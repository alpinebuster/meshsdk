# 顶点/边/面 ID 的连续分配与重映射

网格元素（顶点 `VertId`、边 `EdgeId`、面 `FaceId`）都是以连续整数索引分配的。构造网格时（如使用 `MeshTopology::fromTriangles` 或假想的 `fromPointTriples`），系统会预先按三角面或点集的数量分配顶点和面存储空间，并以 0…N-1 连续编号新元素。合并网格时（例如 `Mesh::addPart`，将一个网格加到当前网格），第二个网格的顶点/面也会在原有计数基础上继续编号，不会发生冲突。如需合并接近的顶点，可调用 `MeshBuilder::uniteCloseVertices` 函数，并传入 `optionalVertOldToNew` 参数来获取合并前后顶点 ID 的映射。删除面时（调用 `MeshTopology::deleteFaces(faceSet)`）会从拓扑中移除对应面，系统自动更新有效面的集合；如果直接修改了拓扑（如删面或拆分边），则需调用 `mesh.invalidateCaches()` 来重建缓存的法线、邻接等信息。通过这些机制，保证所有 ID 始终指向有效元素，必要时进行压缩或重建，以保持索引与底层结构一致。
