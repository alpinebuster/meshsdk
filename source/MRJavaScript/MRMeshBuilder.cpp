#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshBuilderTypes.h>
#include <MRMesh/MRMeshBuilder.h>

using namespace emscripten;
using namespace MR;
using namespace MeshBuilder;


EMSCRIPTEN_BINDINGS( MeshBuilderModule )
{
	class_<UniteCloseParams>( "UniteCloseParams" )
		.constructor<>()

		.property( "closeDist", &UniteCloseParams::closeDist )
		.property( "uniteOnlyBd", &UniteCloseParams::uniteOnlyBd )
        .property( "region", &UniteCloseParams::region, return_value_policy::reference() )
		.property( "duplicateNonManifold", &UniteCloseParams::duplicateNonManifold )
		.property( "optionalVertOldToNew", &UniteCloseParams::optionalVertOldToNew, return_value_policy::reference() )
        .property( "optionalDuplications", &UniteCloseParams::optionalDuplications, return_value_policy::reference() );

    value_object<VertDuplication>( "VertDuplication" )
		.field( "srcVert", &VertDuplication::srcVert )
		.field( "dupVert", &VertDuplication::dupVert );

	value_object<MeshBuilder::MeshPiece>( "MeshPiece" )
		.field( "fmap", &MeshBuilder::MeshPiece::fmap )
		.field( "vmap", &MeshBuilder::MeshPiece::vmap )
		.field( "topology", &MeshBuilder::MeshPiece::topology )
		.field( "rem", &MeshBuilder::MeshPiece::rem );

	function( "fromTriangles", fromTriangles );
	function( "duplicateNonManifoldVertices", duplicateNonManifoldVertices, allow_raw_pointers() );
	function( "fromTrianglesDuplicatingNonManifoldVertices", fromTrianglesDuplicatingNonManifoldVertices, allow_raw_pointers() );
	function( "fromPointTriples", fromPointTriples );
	function( "fromDisjointMeshPieces", fromDisjointMeshPieces );

	function( "addTriangles", select_overload<void( MeshTopology&, const Triangulation&, const BuildSettings& )>( addTriangles ), allow_raw_pointers() );
	function( "addTrianglesWithVertTriples", select_overload<void( MeshTopology&, std::vector<VertId>&, FaceBitSet* )>( addTriangles ), allow_raw_pointers() );

	function( "fromFaceSoup", fromFaceSoup );

	// NOTE: Useful when holes have exact matching by vertices
	function( "uniteCloseVertices", select_overload<int( Mesh&, const MeshBuilder::UniteCloseParams& )>( uniteCloseVertices ) );
	function( "uniteCloseVerticesWithVertMap", select_overload<int( Mesh &, float, bool, VertMap* )>( uniteCloseVertices ), allow_raw_pointers() );
}
