# Scaling mesh with mesh center as pivot point

Use `xfAround` function tor this purpose:

```py
from meshlib import mrmeshpy as mm
mesh = mm.loadMesh( "path/to/mesh.stl" )

scaleFactor = 2

center = mesh.computeBoundingBox().center()
scaleAroundXf =  mm.AffineXf3f.xfAround( mm.Matrix3f.scale( scaleFactor ), center )
mesh.transform( scaleAroundXf )
```
