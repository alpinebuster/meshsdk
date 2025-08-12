#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRSymMatrix3.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( SymMatrix3Module )
{
    class_<SymMatrix3b>( "SymMatrix3b" )
        .constructor<>();

    class_<SymMatrix3i>( "SymMatrix3i" )
        .constructor<>();

    class_<SymMatrix3i64>( "SymMatrix3i64" )
        .constructor<>();
    
    class_<SymMatrix3f>( "SymMatrix3f" )
        .constructor<>();
    
    class_<SymMatrix3d>( "SymMatrix3d" )
        .constructor<>();
}
