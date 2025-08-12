#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector4.h>

#include "MRVector.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( Vector4Module )
{
    MRJS::bindTypedVector4<Vector4b>( "Vector4b", "b" );
    MRJS::bindTypedVector4<Vector4f>( "Vector4f", "f" );
    MRJS::bindTypedVector4<Vector4i>( "Vector4i", "i" );
    MRJS::bindTypedVector4<Vector4i64>( "Vector4i64", "i64" );
    MRJS::bindTypedVector4<Vector4d>( "Vector4d", "d" );
}
