# Undercuts

```py
from meshsdk import mrmeshpy as mm

mesh = mm.loadMesh("path_to_mesh.stl")
direction = mm.Vector3f(0,0,-1)
voxelSize = mm.suggestVoxelSize( mesh, 5e6  )
extrusion = voxelSize * 10
mm.fixUndercuts( mesh, -direction, voxelSize, extrusion  )
# if you want to extrude only some faces use `faces_to_extrude`
# mm.fixUndercuts( mesh, faces_to_extrude, -direction, voxelSize, extrusion  )
mm.saveMesh( mesh, "path_to_result_mesh.stl" )
```
