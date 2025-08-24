#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRAABBTree.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRTriangleIntersection.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRFaceFace.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRMeshPart.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRMeshCollide.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshCollideModule )
{
    function( "findCollidingTriangles", &findCollidingTriangles, allow_raw_pointers() );
    function( "findCollidingTriangleBitsets", &findCollidingTriangleBitsets, allow_raw_pointers() );

    // NOTE: detect self-intersections on mesh
    function( "findSelfCollidingTriangles", select_overload<Expected<std::vector<FaceFace>>( const MeshPart&, ProgressCallback, const Face2RegionMap*, bool )>( &findSelfCollidingTriangles ), allow_raw_pointers() );
    function( "findSelfCollidingTrianglesWithFaceFace", select_overload<Expected<bool>( const MeshPart&, std::vector<FaceFace>*, ProgressCallback, const Face2RegionMap*, bool )>( &findSelfCollidingTriangles ), allow_raw_pointers() );

    // NOTE: `touchIsIntersection  = true` to find overlapping faces and `mesh.deleteFaces` to remove them
    function( "findSelfCollidingTrianglesBS", &findSelfCollidingTrianglesBS, allow_raw_pointers() );
    function( "isInside", &isInside, allow_raw_pointers() );

    function( "isNonIntersectingInside", select_overload<bool( const MeshPart&, const MeshPart&, const AffineXf3f* )>( &isNonIntersectingInside ), allow_raw_pointers() );
    function( "isNonIntersectingInsideWithFaceId", select_overload<bool( const Mesh&, FaceId, const MeshPart&, const AffineXf3f* )>( &isNonIntersectingInside ), allow_raw_pointers() );
}
