# Offset

我们的偏移函数（Offset Functions）都是基于体素（voxel）的。

## 偏移函数的基本原理

偏移函数是一种在计算机图形学和计算几何学中用于处理3D网格的技术，特别适用于生成网格的偏移版本（如扩大或缩小网格）。它们的工作流程如下：

- 生成距离场：从输入的网格（mesh）创建距离场（distance field）。
- 三角化处理：对距离场的等值面（iso-surface）进行三角化（triangulate），生成最终的网格。

> “Triangulate iso-surface” 是一个在计算机图形学和计算几何学中使用的术语，它描述的是将等值面（iso-surface）分解为三角形的过程。

> 等值面（Iso-surface）是三维空间中所有具有相同值的点的集合。简单来说，它是一个表示某个物理量（比如密度、温度或压力）为常数的表面。

举例：在医学成像中，CT 扫描可以生成一个等值面，用来显示人体器官的边界，比如骨骼或心脏的表面。
根据不同的模式（mode）和参数配置，距离场的生成方式会有所不同。

### 距离场的生成
距离场（Distance Field）是一种标量场，定义了空间中每个点到最近表面（这里是输入网格）的距离。对于无符号距离场（Unsigned Distance Field），只需计算最近距离即可。但对于有符号距离场（Signed Distance Field，SDF），还需要确定点是位于网格内部还是外部，以赋予距离正负号。

- 计算距离：通常在体素网格上进行，计算每个体素中心或角点到最近三角形的距离。这可能涉及表面法线或绕数（winding number）的计算。为了提高效率，常用空间加速结构如边界体积层次（BVH）或八叉树。
- 确定符号：符号的确定涉及表面法线或角度加权伪法线（Angle-Weighted Pseudonormal）。例如，Bærentzen和Aanæs的论文“Generating Signed Distance Fields From Triangle Meshes”提出了一种方法，假设三角形法线指向外部，距离在外部为正，内部为负。

### 等值面三角化

等值面（Iso-Surface）是距离场中所有值等于指定偏移距离的点的集合。三角化等值面的常见算法包括：

- 行军立方体（Marching Cubes）：这是最广泛使用的算法之一，检查每个体素，确定其与等值面的交点，并生成三角形网格。例如，MATLAB的示例中使用isosurface函数提取偏移表面。
- 表面网（Surface Nets）或双轮廓（Dual Contouring）：这些是其他替代方法，特别是在需要更平滑结果时。
