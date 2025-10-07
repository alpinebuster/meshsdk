# Fix Undercuts（消除下凹）

在 `MR::FixUndercuts` 命名空间下提供了消除“下凹”区域的函数。主要函数是：

```cpp
void MR::FixUndercuts::fixUndercuts(Mesh &mesh, const Vector3f &upDirection,
                                   float voxelSize=0.0f, float bottomExtension=0.0f);
```

以及带选区的重载，将 `selectedArea` 参数限制在网格的一部分。函数接受一个网格、一个“上升方向”向量（通常指重力相反方向），以及体素分辨率 `voxelSize` 和底部延伸厚度 `bottomExtension`。其实现方法类似各向异性偏移：先将网格在给定方向上按照 `voxelSize` 分辨率体素化，然后向上“填充”空洞，使得所有面相对于 `upDirection` 方向都能得到支撑。调用 `fixUndercuts` 后，原先的下凹/悬垂区域会被内部填充体素占据并重建为实体网格。可以在调用前用 `MR::FixUndercuts::findUndercuts(mesh, upDir, outFaces)` 识别那些下凹面（或顶点），并通过 `getUndercutAreaMetric` 等函数评估下凹面积。总体上，`fixUndercuts` 相当于将网格沿指定方向膨胀或偏移，从而消除过大的下凹角度。
