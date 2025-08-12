#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>

#include "MRVector.h"

using namespace emscripten;
using namespace MR;


// ------------------------------------------------------------------------
// Bind the Embind interface for `Vector3*`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( Vector3Module )
{
    MRJS::bindTypedVector3<Vector3f>( "Vector3f", "f" );
    MRJS::bindTypedVector3<Vector3b>( "Vector3b", "b" );
    MRJS::bindTypedVector3<Vector3i>( "Vector3i", "i" );
    MRJS::bindTypedVector3<Vector3i64>( "Vector3i64", "i64" );
    MRJS::bindTypedVector3<Vector3d>( "Vector3d", "d" );
}
