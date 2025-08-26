#include <optional>
#include <string>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRExpandShrink.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( ExpandShrinkModule )
{
	function( "expand", select_overload<void ( const MeshTopology &, FaceBitSet &, int )>( &expand ) );
	function( "expandWithFaceId", select_overload<FaceBitSet ( const MeshTopology &, FaceId, int )>( &expand ) );

	function( "expandWithVertBitSet", select_overload<void ( const MeshTopology &, VertBitSet &, int )>( &expand ) );
	function( "expandWithVertId", select_overload<VertBitSet ( const MeshTopology &, VertId, int )>( &expand ) );

	function( "shrink", select_overload<void ( const MeshTopology &, FaceBitSet &, int )>( &shrink ) );
	function( "shrinkWithVertBitSet", select_overload<void ( const MeshTopology &, VertBitSet &, int )>( &shrink ) );

	function( "expandFaces", &expandFaces, allow_raw_pointers() );
	function( "shrinkFaces", &shrinkFaces, allow_raw_pointers() );
	function( "getBoundaryFaces", &getBoundaryFaces );
}
