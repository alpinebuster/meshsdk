#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMatrix2.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( Matrix2Module )
{
    class_<Matrix2b>( "Matrix2b" )
        .constructor<>();

    class_<Matrix2i>( "Matrix2i" )
        .constructor<>();

    class_<Matrix2i64>( "Matrix2i64" )
        .constructor<>();
    
    class_<Matrix2f>( "Matrix2f" )
        .constructor<>();
    
    class_<Matrix2d>( "Matrix2d" )
        .constructor<>();
}
