#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBox.h>
#include <MRVoxels/MRFixUndercuts.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;
using namespace FixUndercuts;

// Alternative wrapper that throws exceptions instead of returning error objects
void fixUndercutsImplThrows( Mesh& mesh, const Vector3f& upDirection, float voxelSize = 0.0f, float bottomExtension = 0.0f )
{
	auto result = fix( mesh, { {upDirection}, voxelSize, bottomExtension } );

	if ( !result )
	{
		// Convert the C++ error into a JavaScript exception
		std::string errorMsg = "fixUndercuts failed: " + std::string( result.error() );
		emscripten::val::global( "Error" ).new_( errorMsg ).throw_();
	}
}


EMSCRIPTEN_BINDINGS( FixUndercutsModule )
{
	value_object<FindParams>( "FindParams" )
		.field( "upDirection", &FindParams::upDirection )
		.field( "wallAngle", &FindParams::wallAngle );

	class_<FixParams>( "FixParams" )
		.constructor<>()

		.property( "findParameters", &FixParams::findParameters )
		.property( "voxelSize", &FixParams::voxelSize )
		.property( "bottomExtension", &FixParams::bottomExtension )
		.property( "smooth", &FixParams::smooth );


	// Impl
	function( "fixUndercutsImplThrows", &fixUndercutsImplThrows, allow_raw_pointers() );
	///
}
