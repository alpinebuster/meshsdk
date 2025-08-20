#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRegionBoundary.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( RegionBoundaryModule )
{
	function( "trackLeftBoundaryLoop", select_overload<EdgeLoop( const MeshTopology&, EdgeId, const FaceBitSet* )>( &trackLeftBoundaryLoop ), allow_raw_pointers() );
	function( "trackRightBoundaryLoop", select_overload<EdgeLoop( const MeshTopology&, EdgeId, const FaceBitSet* )>( &trackRightBoundaryLoop ), allow_raw_pointers() );

	function( "findLeftBoundary", select_overload<std::vector<EdgeLoop>( const MeshTopology&, const FaceBitSet* )>( &findLeftBoundary ), allow_raw_pointers() );
	// NOTE: detect holes
	function( "findRightBoundary", select_overload<std::vector<EdgeLoop>( const MeshTopology&, const FaceBitSet* )>( &findRightBoundary ), allow_raw_pointers() );

	function( "delRegionKeepBd", select_overload<std::vector<EdgeLoop>( Mesh&, const FaceBitSet*, bool )>( &delRegionKeepBd ), allow_raw_pointers() );
	function( "findLeftBoundaryInsideMesh", &findLeftBoundaryInsideMesh );
	function( "findRegionBoundaryUndirectedEdgesInsideMesh", &findRegionBoundaryUndirectedEdgesInsideMesh );
	function( "findRegionOuterFaces", &findRegionOuterFaces );

	function( "getIncidentVerts", select_overload<VertBitSet( const MeshTopology&, const FaceBitSet& )>( &getIncidentVerts ) );
	function( "getIncidentVertsWithVertBitSet", select_overload<const VertBitSet&( const MeshTopology&, const FaceBitSet*, VertBitSet& )>( &getIncidentVerts ), allow_raw_pointers() );
	function( "getIncidentVertsWithUndirectedEdgeBitSet", select_overload<VertBitSet( const MeshTopology&, const UndirectedEdgeBitSet& )>( &getIncidentVerts ) );
	function( "getIncidentVertsWithUndirectedEdgeBitSetAndVertBitSet", select_overload<const VertBitSet&( const MeshTopology&, const UndirectedEdgeBitSet*, VertBitSet& )>( &getIncidentVerts ), allow_raw_pointers() );

	function( "getInnerVerts", select_overload<VertBitSet( const MeshTopology&, const FaceBitSet& )>( &getInnerVerts ) );
	function( "getInnerVertsWithFaceBitSetPtr", select_overload<VertBitSet( const MeshTopology&, const FaceBitSet* )>( &getInnerVerts ), allow_raw_pointers() );
	function( "getInnerVertsWithUndirectedEdgeBitSet", select_overload<VertBitSet( const MeshTopology&, const UndirectedEdgeBitSet& )>( &getInnerVerts ) );

	function( "getBoundaryVerts", &getBoundaryVerts, allow_raw_pointers() );
	function( "getRegionBoundaryVerts", &getRegionBoundaryVerts );

	function( "getIncidentFaces", select_overload<FaceBitSet( const MeshTopology&, const VertBitSet& )>( &getIncidentFaces ) );
	function( "getIncidentFacesFromUndirectedEdgeBitSet", select_overload<FaceBitSet( const MeshTopology&, const UndirectedEdgeBitSet& )>( &getIncidentFaces ) );

	function( "getInnerFaces", &getInnerFaces );
	function( "getRegionEdges", &getRegionEdges );
	
	function( "getIncidentEdges", select_overload<UndirectedEdgeBitSet( const MeshTopology&, const FaceBitSet& )>( &getIncidentEdges ) );
	function( "getIncidentEdgesFromUndirectedEdgeBitSet", select_overload<UndirectedEdgeBitSet( const MeshTopology&, const UndirectedEdgeBitSet& )>( &getIncidentEdges ) );

	function( "getNeighborFaces", &getNeighborFaces );

	function( "getInnerEdges", select_overload<UndirectedEdgeBitSet( const MeshTopology&, const VertBitSet& )>( &getInnerEdges ) );
	function( "getInnerEdgesFromFaceBitSet", select_overload<UndirectedEdgeBitSet( const MeshTopology&, const FaceBitSet& )>( &getInnerEdges ) );
}
