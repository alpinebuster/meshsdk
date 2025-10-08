# Offset

Offset functions are based on voxels.

## Fundamental Principles of Offset Functions

Offset functions are a technique used in computer graphics and computational geometry to manipulate 3D meshes, particularly for generating offset versions of meshes (e.g., expanding or contracting the mesh). Their workflow is as follows:

- **Distance Field Generation**: Create a distance field from the input mesh.
- **Triangulation Process**: Triangulate the iso-surface of the distance field to produce the final mesh.

> "Triangulate iso-surface" is a term used in computer graphics and computational geometry that describes the process of decomposing an iso-surface into triangles.

> An iso-surface is a collection of points in three-dimensional space that have the same value. In simpler terms, it is a surface representing a constant value of a physical quantity (such as density, temperature, or pressure).

For instance, in medical imaging, a CT scan can generate an iso-surface to illustrate the boundaries of human organs, such as the surfaces of bones or the heart.

The method for generating the distance field will vary based on different modes and parameter configurations.

### Distance Field Generation

A Distance Field is a scalar field that defines the distance from each point in space to the nearest surface (in this case, the input mesh). For an Unsigned Distance Field, only the nearest distance needs to be computed. However, for a Signed Distance Field (SDF), it is also necessary to determine whether a point is inside or outside the mesh to assign positive or negative distances.

- **Distance Calculation**: This is typically performed on a voxel grid by calculating the distance from the center or corners of each voxel to the nearest triangle. This may involve computing surface normals or winding numbers. To enhance efficiency, spatial acceleration structures such as Bounding Volume Hierarchies (BVH) or Octrees are commonly employed.
- **Sign Determination**: Determining the sign involves using surface normals or angle-weighted pseudonormals. For example, the method proposed by Bærentzen and Aanæs in their paper "Generating Signed Distance Fields From Triangle Meshes" assumes that triangle normals point outward, with distances being positive outside and negative inside.

### Iso-Surface Triangulation

An iso-surface is the collection of all points in the distance field where the values equal a specified offset distance. Common algorithms for triangulating iso-surfaces include:

- **Marching Cubes**: This is one of the most widely used algorithms, checking each voxel, determining its intersection points with the iso-surface, and generating a triangular mesh. For example, the `isosurface` function in MATLAB can extract offset surfaces.
- **Surface Nets** or **Dual Contouring**: These are alternative methods, particularly useful when smoother results are desired.
