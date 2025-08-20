#pragma once

#include <stdio.h>

#include <emscripten.h>
#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>

using namespace emscripten;
using namespace MR;


#ifndef EM_JS_FUNCTIONS_DEMO
#define EM_JS_FUNCTIONS_DEMO

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdollar-in-identifier-extension"
EM_JS( void, greet, ( const char* name ), {
	console.log( `EM_JS: Hello from ${UTF8ToString( name )} by utilizing emscripten to call JS!` );
} );
#pragma clang diagnostic pop

EM_JS( int, add, ( int a, int b ), {
    return a + b;
});

#endif // EM_JS_FUNCTIONS_DEMO
