# Get vertices coordinates for the given mesh

There are at least three ways to get vertices coordinates:

1. Iterate over valid vertices and read coordinates:

```python
from meshsdk import mrmeshpy as mm
mesh = mm.loadMesh("some_mesh.stl")
# no need to pack here because we iterate over valid vertices only
for v in mesh.topology.getValidVerts():
    coord = mesh.points.vec[v.get()]
    print ( coord.x, coord.y, coord.z )
```

2. Take all vertices coordinates (even invalid ones, e.g. removed from mesh but still present in list while may be not packed) as list of mrmeshpy.Vector3f

```python
from meshsdk import mrmeshpy as mm
mesh = mm.loadMesh("some_mesh.stl")
# stl files are always packed, but if you did some operations you might need to pack mesh to eliminate invalid vertices from `points`
# mesh.pack()
points = mesh.points.vec # this data type can be used as standard python list
```

3. Extract vertices as numpy array

```python
from meshsdk import mrmeshpy as mm
from meshsdk import mrmeshnumpy as mn
import numpy as np
mesh = mm.loadMesh("some_mesh.stl")
# stl files are always packed, but if you did some operations you might need to pack mesh to eliminate invalid vertices from `points`
# mesh.pack()
vertsNP = mn.getNumpyVerts( mesh ) # same as `mn.toNumpyArray( mesh.points )` or `mn.toNumpyArray( mesh.points.vec )`
```
