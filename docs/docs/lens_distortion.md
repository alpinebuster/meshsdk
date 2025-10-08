# **General Camera Parameters**

---

### 🔍 Parameter Overview:

```js
{
  distortion: new THREE.Vector2(0, 0),       // uK0
  principalPoint: new THREE.Vector2(0, 0),   // uCc
  focalLength: new THREE.Vector2(1, 1),      // uFc
  skew: 0,                                   // uAlpha_c
}
```

---

### ✅ Definitions and Roles of Each Parameter in Camera Model:

| Parameter          | Uniform Name | Meaning                                            | Corresponding Item in Camera Matrix   |
| ------------------ | ------------ | -------------------------------------------------- | ------------------------------------- |
| `distortion`       | `uK0`        | The first parameter of radial distortion coefficients (K1, K2...) (e.g., K1 for the `$r^2$` term) | N/A (used in distortion function)     |
| `principalPoint`   | `uCc`        | Principal point (image center), in pixels. Typically near the center of the image, e.g., (cx, cy) | Offset terms in the camera intrinsic matrix `$(c_x, c_y)$` |
| `focalLength`      | `uFc`      | Focal length, in pixels. Typically `$(f_x, f_y)$`, related to horizontal/vertical scaling of the image | `$f_x, f_y$` in the camera intrinsic matrix |
| `skew`             | `uAlpha_c`   | Non-orthogonality between pixels, normally 0; non-zero only in cases of special lenses or sensor tilting | Skew term (α) in the camera intrinsic matrix |

---

### 📷 Correspondence of Camera Intrinsic Matrix (K):

```latex
$$
K =
\begin{bmatrix}
f_x & \alpha & c_x \\
0   & f_y    & c_y \\
0   & 0      & 1
\end{bmatrix}
$$
```

PS:

* `focalLength` → `$f_x, f_y$`
* `skew` → `$\alpha$`
* `principalPoint` → `$c_x, c_y$`

### 💡 Retrieving Parameters from Camera Calibration Tools (e.g., OpenCV's cv::calibrateCamera()):

```cpp
cv::Mat cameraMatrix = [ fx,  skew, cx,
                         0,   fy,   cy,
                         0,   0,     1 ];
cv::Mat distCoeffs = [ k1, k2, p1, p2, k3 ];
```

* `k1`, `k2` → Correspond to the passed-in `uK0`
* `fx`, `fy`, `cx`, `cy`, `skew` → Correspond to the aforementioned items respectively.
