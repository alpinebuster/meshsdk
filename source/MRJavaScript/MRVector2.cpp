#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>

#include "MRVector.h"

using namespace emscripten;
using namespace MR;


// ------------------------------------------------------------------------
// Bind the Embind interface for `Vector2*`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( Vector2Module )
{
    MRJS::bindTypedVector2<Vector2i>( "Vector2i" );
    MRJS::bindTypedVector2<Vector2f>( "Vector2f" );
    MRJS::bindTypedVector2<Vector2i64>( "Vector2i64" );
    MRJS::bindTypedVector2<Vector2b>( "Vector2b" );
    MRJS::bindTypedVector2<Vector2d>( "Vector2d" );
}
