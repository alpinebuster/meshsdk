from meshsdk import mrmeshpy as mm
import math
import os
import pdb
import numpy as np


def extract_hole_boundary_points(mesh, hole_edges):
    """
    Extract the 3D coordinates of vertices around a hole boundary
    given a list of edges (hole_edges). Returns the vertex positions
    corresponding to the origin of each edge.
    """
    boundary_points = mm.Contour3f()

    for edge in hole_edges:
        vertex_id = mesh.topology.org(edge)
        vertex_pos = mesh.points[vertex_id]
        boundary_points.append(vertex_pos)

    return boundary_points

def compute_hole_centroid_and_normal(boundary_points):
    """
    Calculate the centroid (center point) and approximate normal direction
    of a hole boundary. This helps better understanding the hole's orientation.
    """
    n = boundary_points.size()
    if n < 3:
        return mm.Vector3f(0, 0, 0), mm.Vector3f(0, 0, 1)
    
    # Calculate centroid by averaging all boundary points
    # 
    # centroid = mm.Vector3f(0, 0, 0)
    # for i in range(n):
    #     centroid.x += boundary_points[i].x
    #     centroid.y += boundary_points[i].y
    #     centroid.z += boundary_points[i].z
    
    # centroid.x /= n
    # centroid.y /= n
    # centroid.z /= n
    # 
    pts = np.array([[p.x, p.y, p.z] for p in boundary_points])
    centroid_np = pts.mean(axis=0)
    centroid = mm.Vector3f(*centroid_np)

    
    centroid_np = pts.mean(axis=0)
    centroid = mm.Vector3f(*centroid_np)



    ###
    # PCA for the points
    # pdb.set_trace()
    pts_centered = pts - centroid_np
    cov = np.dot(pts_centered.T, pts_centered) / n
    eigvals, eigvecs = np.linalg.eigh(cov)
    normal_np = eigvecs[:, 0]  # the normal direction corresponding to the smallest eigenvalue

    normal = mm.Vector3f(*normal_np).normalized()
    ###

    
    return centroid, normal


def scale_boundary_to_bbox(original_points, original_centroid, target_centroid, bbox, custom_scale=1.):
    """Scale the original_points uniformly so they at least touch one face of the BoundingBox.
        margin: optional distance to scale slightly beyond the BoundingBox.
    """
    # Compute the vector from the original centroid to the target centroid
    translation_vector = mm.Vector3f(
        target_centroid.x - original_centroid.x,
        target_centroid.y - original_centroid.y,
        target_centroid.z - original_centroid.z
    )
    # Translate all points so centroid is exactly target_centroid
    translated_points = mm.Contour3f()
    for i in range(original_points.size()):
        translated_points.append(mm.Vector3f(
            original_points[i].x + translation_vector.x,
            original_points[i].y + translation_vector.y,
            # NOTE: this makes things complicated
            # original_points[i].z + translation_vector.z
            target_centroid.z
        ))


    # Find required scale_factor
    min_scale = float("inf")
    for p in translated_points:
        # Direction from new centroid
        dir_vec = mm.Vector3f(
            p.x - target_centroid.x,
            p.y - target_centroid.y,
            p.z - target_centroid.z
        )

        if dir_vec.x == dir_vec.y == dir_vec.z == 0:
            continue

        possible_scales = []
        for d, c, bmin, bmax in zip(
            (dir_vec.x, dir_vec.y, dir_vec.z),
            (target_centroid.x, target_centroid.y, target_centroid.z),
            (bbox.min.x, bbox.min.y, bbox.min.z),
            (bbox.max.x, bbox.max.y, bbox.max.z),
        ):
            if abs(d) < 1e-6:
                continue

            if d > 0:
                scale = (bmax - c) / d
            else:
                scale = (bmin - c) / d

            if scale > 0:
                possible_scales.append(scale)

        if possible_scales:
            min_scale = min(min_scale, min(possible_scales))

    scale_factor = min_scale * custom_scale
    # pdb.set_trace()


    # Scale up translated_points
    scaled_points = mm.Contour3f()
    scaled_points.resize(translated_points.size() + 1)
    for i in range(translated_points.size()):
        offset = mm.Vector3f(
            translated_points[i].x - target_centroid.x, 
            translated_points[i].y - target_centroid.y, 
            translated_points[i].z - target_centroid.z,
        )
        scaled_points[i] = mm.Vector3f(
            target_centroid.x + offset.x * scale_factor,
            target_centroid.y + offset.y * scale_factor,
            target_centroid.z
        )

    scaled_points[translated_points.size()] = scaled_points[0]  # close points

    return scaled_points



# Main
base_dir = os.path.dirname(__file__)
meshA_path = os.path.abspath(os.path.join(base_dir, "..", "_assets", "mandible-binary.stl"))
meshB_path = os.path.abspath(os.path.join(base_dir, "..", "_assets", "maxilla-binary.stl"))

# Load and combine the meshes
meshA = mm.loadMesh(meshA_path)
meshB = mm.loadMesh(meshB_path)

mesh = mm.Mesh()
mesh.addMesh(meshA)
mesh.addMesh(meshB)
# Flip normals to ensure consistent orientation
# mesh.topology.flipOrientation()

# Store average edge length for later use in subdivision
avgEdgeLength = mesh.averageEdgeLength()


###
# Find the hole boundaries - these represent the openings we need to connect
holes = mesh.topology.findHoleRepresentiveEdges()
assert holes.size() == 2, f"Expected 2 holes, found {holes.size()}"

print(f"Found {holes.size()} holes to connect")
###


###
# Extract boundary information from both holes
holes_with_all_edges = mm.findRightBoundary(mesh.topology)
hole1_boundary = extract_hole_boundary_points(mesh, holes_with_all_edges[0])
hole2_boundary = extract_hole_boundary_points(mesh, holes_with_all_edges[1])

print(f"Hole 1 has {hole1_boundary.size()} boundary points")
print(f"Hole 2 has {hole2_boundary.size()} boundary points")

# Calculate centroids and normals for both holes
centroid1, normal1 = compute_hole_centroid_and_normal(hole1_boundary)
centroid2, normal2 = compute_hole_centroid_and_normal(hole2_boundary)

print(f"Hole 1 centroid: ({centroid1.x:.2f}, {centroid1.y:.2f}, {centroid1.z:.2f}), normal: {normal1}")
print(f"Hole 2 centroid: ({centroid2.x:.2f}, {centroid2.y:.2f}, {centroid2.z:.2f}), normal: {normal2}")
###


###
# Determine number of guide curves - more curves give smoother transitions
# but require more conservative scaling to avoid intersections
numGuides = 5
scale = 1.7
bbox = mesh.computeBoundingBox()
for i in range(numGuides):
    # Calculate interpolation ratio (0 = closer to hole1, 1 = closer to hole2)
    zRatio = float(i + 1) / float(numGuides + 1)
    print(f"Creating guide curve {i+1}/{numGuides} at interpolation ratio {zRatio:.2f}")
    
    # Interpolate position between the two centroids
    intermediate_centroid = mm.Vector3f(
        centroid1.x * (1.0 - zRatio) + centroid2.x * zRatio,
        centroid1.y * (1.0 - zRatio) + centroid2.y * zRatio,
        centroid1.z * (1.0 - zRatio) + centroid2.z * zRatio
    )
    
    # Choose which boundary to use as template (alternate or use the larger one)
    if zRatio < 1/2:
        # Use hole1 boundary as template
        template_boundary = hole1_boundary
        template_centroid = centroid1
    else:
        # Use hole2 boundary as template
        template_boundary = hole2_boundary
        template_centroid = centroid2
    
    # Generate dynamically scaled and positioned guide curve
    guide_points = scale_boundary_to_bbox(
        template_boundary,
        template_centroid,
        intermediate_centroid,
        bbox,
        scale,
    )
    
    # Add this guide curve to the mesh as a separate edge loop
    loopId = mesh.addSeparateEdgeLoop(guide_points)
    if zRatio < 1/2:
        holes.insert(holes.size() - 1, loopId.sym())
        holes.insert(holes.size() - 1, loopId)
    else:
        holes.insert(holes.size() - 1, loopId)
        holes.insert(holes.size() - 1, loopId.sym())
    pdb.set_trace()

print(f"Total curves to stitch (original two + all guidelines): {holes.size()}")
###


###
# Stitch all the curves together to create the connecting surface
sParams = mm.StitchHolesParams()
sParams.metric = mm.getCircumscribedMetric(mesh)
# Remember which faces existed before stitching
oldFaces = mesh.topology.getValidFaces()

# Stitch adjacent pairs of curves
for i in range(int(holes.size() / 2)):
    mm.buildCylinderBetweenTwoHoles(mesh,holes[i*2],holes[i*2+1],sParams)
###


# Post-processing: improve the quality of the newly created surface
print("Post-processing the new surface...")
# Identify the newly created faces
newFaces = mesh.topology.getValidFaces() - oldFaces

###
# Subdivide the new faces to improve surface quality
sSettings = mm.SubdivideSettings()
sSettings.maxEdgeLen = avgEdgeLength * 3  # Smaller multiplier for finer detail
sSettings.maxEdgeSplits = 1000000
sSettings.region = newFaces
mm.subdivideMesh(mesh, sSettings)
###


###
# Get vertices in the new region for smoothing
vertRegion = mm.getIncidentVerts(mesh.topology, newFaces)
# Shrink the region slightly to avoid affecting the original boundaries
mm.shrink(mesh.topology, vertRegion, 2)
# Smooth the vertices for a more natural surface
mm.positionVertsSmoothly(mesh, vertRegion, mm.EdgeWeights.Cotan, mm.VertexMass.NeiArea)
###


# Save the result
result_path = os.path.abspath(os.path.join(base_dir, "MeshFillHoleWithGuidelines.stl"))
mm.saveMesh(mesh, result_path)
print(f"Successfully created mesh connection and saved to: {result_path}")
