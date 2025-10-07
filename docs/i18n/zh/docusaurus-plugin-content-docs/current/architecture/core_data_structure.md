# 核心数据结构

> Mesh、点、边、三角形

`asmesh` 使用**半边（Half-Edge）数据结构**来存储三角网格拓扑。其核心类是:

- **顶点（Vert）** 用类型 `MR::VertId` 表示，存储在连续数组中（`Mesh.points`），通过 `VertId` 索引访问坐标
- **三角面（Face）** 由三个半边闭合形成，存储顶点索引。三角面用 `MR::FaceId`，
- **边（Edge）** 采用半边表示，每条无向边由两个反向半边组成。半边连通顶点和三角面，并通过邻接指针可快速访问邻边、邻面等信息。有向边用 `MR::EdgeId`，无向边用 `MR::UndirectedEdgeId`。
- **`MR::Mesh`** 是主网格类，封装顶点坐标 (`points`)、拓扑 (`MeshTopology topology`)、以及缓存的 AABB 树等加速结构。提供如加载/保存 (`MeshLoad`/`MeshSave`)、几何查询（`projectPoint`、`getClosestEdge`/`Vertex`）等接口
  - **`MeshTopology`** 存储并管理网格的拓扑信息（半边结构）。它内部维护顶点到半边、半边到面、面到半边等关系，并提供诸如遍历环回路、查找孔洞边缘（`findHoleRepresentiveEdges()`）、生成辅助选择（BitSet）等方法
  - **`MeshBuilder`**：负责从原始几何数据（顶点列表、三角形列表、多边形面片等）构造 `MR::Mesh` 对象的静态方法集合，包括前述的 `fromPointTriples`、`fromTriangles` 等
  - **`MR::MeshLoad`/`MR::MeshSave`**：文件 I/O 模块。`MeshLoad::fromAnySupportedFormat` 负责识别并解析各种格式（STL/OBJ/PLY 等），将数据送入 `MeshBuilder` 构造网格。`MeshSave` 则将 `MR::Mesh` 导出为指定格式
  - **`MR::AABBTree`/`MR::AABBTreePoints`**：空间索引结构，支持在网格和顶点集上进行加速查询。通常由 `MR::Mesh` 内部构建并缓存，供各种算法调用
  - **其他几何算法模块**：如 `MR::MeshFillHole`（孔洞填充）、`MR::MeshExtrude`（挤出）、布尔运算、投影、重建等，均基于上述数据结构实现，调用拓扑和几何工具完成各类操作

该结构支持动态插入与删除操作：例如，`MR::Mesh::addPart` 系列函数可将另一个 Mesh 的部分或全部三角面并入当前网格（创建新的顶点、边、面）；而 `MR::Mesh::deleteFaces(const FaceBitSet &fs, …)` 可删除指定的一组三角面，并自动移除所有不再被剩余面共享的边与顶点。删除操作后，可调用 `pack()` 或 `packOptimally()` 等方法收紧数据索引，提高存储局部性并回收空间。这些类协同工作：例如加载 STL 时，`MeshLoad` 调用 `MeshBuilder` 将面片逐一加入 `MR::Mesh`；网格创建后可用 `MeshTopology` 遍历孔洞并调用 `fillHole`；投影和交互运算则使用 `AABBTree` 来加速邻近三角面的定位。

## STL 文件三角化处理

通过加载接口 `MR::MeshLoad::fromAnySupportedFormat(path)` 读取包括 STL 在内的多种格式。对于 STL 文件（无论 ASCII 还是二进制），库会解析每个面片的顶点坐标和法线信息，然后利用内部的网格构造器生成三角网格。具体地，`asmesh` 包含 `MeshBuilder` 功能：例如，可通过 `MR::Mesh::fromPointTriples(std::vector<Triangle3f>)` 构造 Mesh。该函数接受一组三角形顶点（`Triangle3f`），直接生成网格的顶点和三角面，默认情况下在非流形顶点处可选择复制顶点以确保流形性。

对于更一般的情形，`asmesh` 也支持“面片汤”（face soup）：即使输入的多边形面包含任意顶点数，构造函数也会**自动将非三角形面划分为三角形**。这意味着用户给定多边形列表，系统会在内部三角化。在 STL 场景中，由于每个面已是三角形，此步骤通常可视为直接插入三角片。但以上机制保证了任意导入网格都被转换为稳定的三角网格表示。构造完成后，`asmesh` 会为网格分配唯一的顶点 ID、边 ID、面 ID，确保全局索引连续，并保留重映射信息以支持后续的几何查询或拓扑操作。

## AABB 树的实现与用途

`asmesh` 为网格构建**轴对齐包围盒（AABB）树**作为加速数据结构，以支持空间查询和碰撞检测。`MR::Mesh` 类内部缓存两个 AABB 树：一个是针对三角面集合的 `AABBTree`，另一个是针对顶点集合的 `AABBTreePoints`。调用 `mesh.getAABBTree()` 时，如果树尚未构建则会自动生成，然后缓存以备后续使用；`getAABBTreePoints()` 同理用于顶点。

这些 AABB 树在多种任务中发挥关键作用：

- **网格投影（mesh projection）**：在执行点到网格的最近点投影时，算法首先利用 AABB 树进行广义排查快速锁定候选三角面，然后精确计算距离。这使得 `MR::Mesh::projectPoint(…)` 等函数能够在复杂网格上高效求解最近点。实际上，网格的包围盒（bounding box）计算就通过 `getAABBTree()` 实现，说明投影与最近点查询依赖 AABB 树
- **网格修复（mesh repair）**：例如检测与消除自相交（self-intersections）时，算法需要查找可能相交的三角对。此时 AABB 树可极大地降低配对检查数量，只对树中包围盒相交的三角区域进行更精细的三角形-三角形相交测试，从而提高性能。`asmesh` 的布尔运算和自相交修复工具即利用此策略（类似常见的广义-狭义碰撞检测方法）
- **网格分割（mesh splitting）**：当将网格按给定平面或另一几何体切分时，需要判断哪些三角面被切割。AABB 树同样可快速定位与切割实体相交的三角面，减少不必要的计算，加速分割算法
- **孔洞填充（hole filling）**：虽然寻找孔洞边缘主要依赖拓扑遍历（`MeshTopology::findHoleRepresentiveEdges()`），但填充算法中可能需要计算新顶点的位置和与原网格的距离，这些操作也会间接利用 AABB 树以加速空间搜索

AABB 树作为空间加速结构被广泛用于“宽相位”剔除（快速排除不可能相交的区域）和最近邻查询，以提高几何处理效率。例如，`getBoundingBox()` 方法即是基于 AABB 树实现的，说明几何查询流程中 AABB 树的核心地位。

## 功能对应的关键类与文件

- **Mesh 和 MeshTopology：** 定义于 `source/MRMesh/MRMesh.h` 及 `MRMeshTopology.h`，管理顶点/边/面的存储和邻接关系
- **AABBTree：** 定义于 `source/MRMesh/AABBTree.h`（对三角面）和 `AABBTreePoints.h`（对顶点集），实现空间加速索引
- **孔洞填充：** 函数 `MR::fillHole` 在 `MRMeshFillHole.h` 中声明，通过 `MeshTopology::findHoleRepresentiveEdges` 找到孔洞边界并生成新面。`FillHoleParams`（同文件）可调节三角化细节
- **点投影：** 相关实现分布在 `MRMeshIntersect.h`、`MRMeshDistance.h` 等文件中，调用 `AABBTree` 查询加速
- **Fix Undercuts：** 在 `MRFixUndercuts.h` 中声明的 `MR::FixUndercuts::fixUndercuts` 函数，底层通过体素化网格并向上偏移来去除下凹
- **网格分割：** 使用 `MRMeshFillContour.h` 中的 `fillContourLeft`，配合 `mesh.invalidateCaches()` 完成拓扑分离
