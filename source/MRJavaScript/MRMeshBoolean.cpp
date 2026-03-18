#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBooleanOperation.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRMeshCollidePrecise.h>
#include <MRMesh/MRIntersectionContour.h>
#include <MRMesh/MRContoursCut.h>
#include <MRMesh/MRTorus.h>
#include <MRMesh/MRMatrix3.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRFillContour.h>
#include <MRMesh/MRPrecisePredicates3.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRMeshCollide.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRContoursStitch.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRMeshComponents.h>
#include <MRMesh/MRMeshBoolean.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshBooleanModule )
{
    class_<BooleanResult>( "BooleanResult" )
        .constructor<>()
        .property( "mesh", &BooleanResult::mesh )
        .property( "meshABadContourFaces", &BooleanResult::meshABadContourFaces )
        .property( "meshBBadContourFaces", &BooleanResult::meshBBadContourFaces )
        .property( "errorString", &BooleanResult::errorString )

        .function( "valid", &BooleanResult::valid )
        .function( "getMesh", optional_override( [] ( BooleanResult& br )
        {
            return br.mesh;
        } ) );

    class_<BooleanPreCutResult>( "BooleanPreCutResult" )
        .constructor<>()
        .property( "mesh", &BooleanPreCutResult::mesh )
        .property( "contours", &BooleanPreCutResult::contours );

    class_<BooleanParameters>( "BooleanParameters" )
        .constructor<>()
        .property( "rigidB2A", &BooleanParameters::rigidB2A, allow_raw_pointers() )
        .property( "mapper", &BooleanParameters::mapper, allow_raw_pointers() )
        .property( "outPreCutA", &BooleanParameters::outPreCutA, allow_raw_pointers() )
        .property( "outPreCutB", &BooleanParameters::outPreCutB, allow_raw_pointers() )
        .property( "outCutEdges", &BooleanParameters::outCutEdges, allow_raw_pointers() )
        .property( "mergeAllNonIntersectingComponents", &BooleanParameters::mergeAllNonIntersectingComponents )
        .property( "forceCut", &BooleanParameters::forceCut )
        .property( "cb", &BooleanParameters::cb );

    class_<BooleanResultPoints>( "BooleanResultPoints" )
        .constructor<>()
        .property( "meshAVerts", &BooleanResultPoints::meshAVerts )
        .property( "meshBVerts", &BooleanResultPoints::meshBVerts )
        .property( "intersectionPoints", &BooleanResultPoints::intersectionPoints );


    ///
    function( "boolean", select_overload<BooleanResult( const Mesh&, const Mesh&, BooleanOperation, const AffineXf3f*, BooleanResultMapper*, ProgressCallback )>( &boolean ), allow_raw_pointers() );
    function( "booleanByMove", select_overload<BooleanResult( Mesh&&, Mesh&&, BooleanOperation, const AffineXf3f*, BooleanResultMapper*, ProgressCallback )>( &boolean ), allow_raw_pointers() );

    function( "booleanWithParams", select_overload<BooleanResult( const Mesh&, const Mesh&, BooleanOperation, const BooleanParameters& )>( &boolean ) );
    function( "booleanByMoveWithParams", select_overload<BooleanResult( Mesh&&, Mesh&&, BooleanOperation, const BooleanParameters& )>( &boolean ) );


    function( "selfBoolean", &selfBoolean );
    function( "findIntersectionContours", &findIntersectionContours, allow_raw_pointers() );
    function( "getBooleanPoints", &getBooleanPoints, allow_raw_pointers() );
    ///
}
