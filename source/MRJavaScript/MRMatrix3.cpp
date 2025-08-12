#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMatrix3.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( Matrix3Module )
{
    class_<Matrix3b>( "Matrix3b" )
        .constructor<>();

    class_<Matrix3i>( "Matrix3i" )
        .constructor<>();

    class_<Matrix3i64>( "Matrix3i64" )
        .constructor<>();
    
    class_<Matrix3f>( "Matrix3f" )
        .constructor<>();
    
    class_<Matrix3d>( "Matrix3d" )
        .constructor<>();
}
