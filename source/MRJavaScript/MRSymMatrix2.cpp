#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRSymMatrix2.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( SymMatrix2Module )
{
    class_<SymMatrix2b>( "SymMatrix2b" )
        .constructor<>();

    class_<SymMatrix2i>( "SymMatrix2i" )
        .constructor<>();

    class_<SymMatrix2i64>( "SymMatrix2i64" )
        .constructor<>();
    
    class_<SymMatrix2f>( "SymMatrix2f" )
        .constructor<>();
    
    class_<SymMatrix2d>( "SymMatrix2d" )
        .constructor<>();
}
