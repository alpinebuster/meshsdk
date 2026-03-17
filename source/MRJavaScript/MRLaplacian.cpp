#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MRLaplacian.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( LaplacianModule )
{
	class_<Laplacian>( "Laplacian" )
		.constructor<Mesh&>()
		.constructor<const MeshTopology&, VertCoords&>()

		.function( "init", &Laplacian::init )
		.function( "fixVertex", select_overload<void( VertId, bool )>( &Laplacian::fixVertex ) )
		.function( "fixVertexWithPos", select_overload<void( VertId, const Vector3f&, bool )>( &Laplacian::fixVertex ) )
		.function( "updateSolver", &Laplacian::updateSolver )
		.function( "apply", &Laplacian::apply )
		.function( "applyToScalar", &Laplacian::applyToScalar )
		.function( "region", &Laplacian::region, allow_raw_pointers() )
		.function( "freeVerts", &Laplacian::freeVerts, allow_raw_pointers() )
		.function( "firstLayerFixedVerts", &Laplacian::firstLayerFixedVerts, allow_raw_pointers() );
}
