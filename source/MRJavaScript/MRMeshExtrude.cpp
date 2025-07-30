#include <optional>
#include <memory>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshExtrude.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshExtrudeModule )
{
	class_<MakeDegenerateBandAroundRegionParams>( "MakeDegenerateBandAroundRegionParams" )
		.constructor<>()
		.property( "outNewFaces", &MakeDegenerateBandAroundRegionParams::outNewFaces, return_value_policy::reference() )
		.property( "outExtrudedEdges", &MakeDegenerateBandAroundRegionParams::outExtrudedEdges, return_value_policy::reference() )
		.property( "new2OldMap", &MakeDegenerateBandAroundRegionParams::new2OldMap, return_value_policy::reference() )

		.function( "getMaxEdgeLength", optional_override( [] ( MakeDegenerateBandAroundRegionParams& self )
		{
			if ( !self.maxEdgeLength ) throw std::runtime_error( "maxEdgeLength is null" );
			return *self.maxEdgeLength;
		}))
		.function( "setMaxEdgeLength", optional_override( [] ( MakeDegenerateBandAroundRegionParams& self, float v )
		{
			if ( !self.maxEdgeLength ) self.maxEdgeLength = new float;
			*self.maxEdgeLength = v;
		}));

		
	function( "makeDegenerateBandAroundRegion", &makeDegenerateBandAroundRegion );
}
