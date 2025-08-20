#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>

#include "MRJavaScript.h"

using namespace emscripten;
using namespace MR;


int main()
{
    printf( "C++ Main: Hello 👋\n" );

    EM_ASM(
        console.log( "EM_ASM: Hello from C++ to JS!" );
    );

    greet( "C++" );

    return 0;
}
