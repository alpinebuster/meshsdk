# Pack Mesh

Mesh contains array of edges, triangles and vertices. Some array elements may be unused (contain deleted items) after some operations like decimation/simplification and others. Mesh packing eliminates all unused elements and reduces the size of mesh in memory, but the IDs of existing elements are changed during packing, so it is not always desirable to do. That is why we have a option in remesh whether to perform packing or not.
