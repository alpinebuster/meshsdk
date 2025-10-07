# **通用相机参数（Camera Intrinsic Parameters）**

---

### 🔍 参数一览：

```js
{
  distortion: new THREE.Vector2(0, 0),       // uK0
  principalPoint: new THREE.Vector2(0, 0),   // uCc
  focalLength: new THREE.Vector2(1, 1),      // uFc
  skew: 0,                                   // uAlpha_c
}
```

---

### ✅ 各参数含义及其在相机模型中的作用：

| 参数               | Uniform 名  | 含义                                         | 相机矩阵中的对应项                |
| ---------------- | ---------- | ------------------------------------------ | ------------------------ |
| `distortion`     | `uK0`      | 径向畸变系数 (K1, K2...) 的第一个参数（如 K1，用于 $r^2$ 项） | N/A (用于畸变函数)             |
| `principalPoint` | `uCc`      | 主点（成像中心），单位像素。通常是图像中心附近，例如 (cx, cy)        | 相机内参矩阵中的偏移项 $(c_x, c_y)$ |
| `focalLength`    | `uFc`      | 焦距，单位像素。通常是 $(f_x, f_y)$，与图像的水平/垂直缩放有关     | 相机内参矩阵中的 $f_x, f_y$      |
| `skew`           | `uAlpha_c` | 像素之间的非正交性，正常为 0，仅在特殊镜头或传感器倾斜时非零            | 相机内参矩阵中的 skew（α）项        |

---

### 📷 相机内参矩阵 (K) 对应关系：

$$
K =
\begin{bmatrix}
f_x & \alpha & c_x \\
0   & f_y    & c_y \\
0   & 0      & 1
\end{bmatrix}
$$

PS：

* `focalLength` → $f_x, f_y$
* `skew` → $\alpha$
* `principalPoint` → $c_x, c_y$


### 💡 从相机标定工具（如 OpenCV 的 cv::calibrateCamera()）中获取参数

```cpp
cv::Mat cameraMatrix = [ fx,  skew, cx,
                         0,   fy,   cy,
                         0,   0,     1 ];
cv::Mat distCoeffs = [ k1, k2, p1, p2, k3 ];
```

* `k1`, `k2` → 对应传入的 `uK0`
* `fx`, `fy`, `cx`, `cy`, `skew` → 分别对应上述项
