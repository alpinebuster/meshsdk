# Core Data Structures

Mesh, points, edges, triangles.

## Terminology 

- **"component"** is part of the Mesh that has no connection with other parts of same Mesh
- **"merge"** operation in MeshLib is adding several independent Meshes into one Mesh making components from them (addMesh and addMeshPart functions)
- **"boolean union"** operation stitches intersecting Meshes making new Mesh that is composition of input meshes (it cannot work with some bad defined cases like non closed intersection contours or self-intersections in this zone) (also if meshes does not intersect this operation works a lot like merge but with respect to meshes orientations)
