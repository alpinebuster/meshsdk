# Fix Undercuts

Within the `MR::FixUndercuts` namespace, functions are provided to eliminate "undercut" regions. The primary function is:

```cpp
void MR::FixUndercuts::fixUndercuts(Mesh &mesh, const Vector3f &upDirection,
                                     float voxelSize=0.0f, float bottomExtension=0.0f);
```

An overloaded version includes a `selectedArea` parameter that restricts the operation to a specific part of the mesh. This function accepts a mesh, an "upward direction" vector (typically opposite to the direction of gravity), along with the voxel resolution `voxelSize` and a bottom extension thickness `bottomExtension`. 

The implementation approach is analogous to anisotropic offsetting: first, the mesh is voxelized along the specified direction with the resolution defined by `voxelSize`, and then voids are "filled" upward, ensuring that all faces receive support relative to the `upDirection`. Following the invocation of `fixUndercuts`, the previously undercut or overhanging regions will be filled with voxels and reconstructed into a solid mesh. Prior to calling, one can utilize `MR::FixUndercuts::findUndercuts(mesh, upDir, outFaces)` to identify the undercut faces (or vertices) and assess the undercut area using functions like `getUndercutAreaMetric`. Overall, `fixUndercuts` effectively expands or offsets the mesh in the specified direction, thereby eliminating excessive undercut angles.
