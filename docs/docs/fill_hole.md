# How to fill hole in mesh

Find the vertices of the paths representing holes in a surface of a mesh (implement a 'fill hole' feature to close the desired holes).

Suppose you have a

```cpp
Mesh mesh = ...
```

Then you can find all holes in it using

```cpp
auto holeRepresEdges = mesh.topology.findHoleRepresentiveEdges();
```

Each hole in the mesh will be represented by exactly one of its edge (having that hole to the left) in holeRepresEdges vector. The you can approach your task as follows:

```cpp
// iterate over all holes
for ( auto e0 : holeRepresEdges )
{
    // iterate over all edges of the current hole
    for ( auto e : leftRing( mesh.topology, e0 ) )
    {
        auto v = mesh.topology.org( e );
        // all (v)s constitute the vertices of the current hole
    }
}
```
