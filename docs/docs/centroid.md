# Centroid vs Bounding Box Center

In computational geometry, **centroid (mass center)** and **bounding box center** are different concepts:

- **Bounding box center**:  
  Simply the geometric center of the mesh’s bounding box.
- **Centroid (mass center)**:  
  Computed by considering the distribution of all mesh faces, more complex but more accurate.


```python
from meshsdk import mrmeshpy as mm

# Create a UV sphere mesh
mesh = mm.makeUVSphere()

# 1. Bounding box center
boxCenter = mesh.computeBoundingBox().center()
print("Bounding box center:", boxCenter)

# 2. Centroid calculation
pointAccum = mm.PointAccumulator()
mm.accumulateFaceCenters(pointAccum, mesh)

centroid = mm.Vector3f()
eigenvectors = mm.Matrix3f()
eigenvalues = mm.Vector3f()
pointAccum.getCenteredCovarianceEigen(centroid, eigenvectors, eigenvalues)
print("Centroid (mass center):", centroid)
```
