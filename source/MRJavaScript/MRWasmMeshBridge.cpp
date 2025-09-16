#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>

#include <cstdint>
#include <cstdlib>

using namespace emscripten;
using namespace MR;


// Prevent name mangling in C++, ensuring that the function can be called from C or other languages (JS/WASM).
// For example: `void foo(int x);`
// After compilation, C++ may generate a symbol like _Z3fooi instead of the simple foo.
// This means that the function cannot be directly called by name in C code or other languages.
//
// Or use `EMSCRIPTEN_KEEPALIVE`
// 
// ```cpp
// EMSCRIPTEN_KEEPALIVE
// void foo( int x ) { return x * 2; }
// ```
// 
// ```js
// Module._foo();
// // NOTE: `Module.ccall(funcName, returnType, argTypes, args)`
// Module.ccall('foo', 'number', ['number'], [42]);
// ```
//
extern "C" {

    // To maintain compatibility with C code style, functions that return pointers as integers in the `uintptr_t` style are still provided
    uintptr_t createVerticesRaw( size_t vertexCount )
    {
        if ( vertexCount == 0 ) return 0;
        size_t bytes = vertexCount * 3 * sizeof( float );
        void* p = std::malloc( bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    uintptr_t reallocVerticesRaw( uintptr_t ptrVal, size_t newVertexCount )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( newVertexCount == 0 )
        {
            std::free( ptr );
            return 0;
        }
        size_t bytes = newVertexCount * 3 * sizeof( float );
        void* p = std::realloc( ptr, bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    void freeVerticesRaw( uintptr_t ptrVal )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( ptr ) std::free( ptr );
    }


    uintptr_t createIndicesRaw( size_t indexCount, int elementSize )
    {
        if ( indexCount == 0 ) return 0;
        if ( elementSize != 2 && elementSize != 4 ) return 0;
        size_t bytes = indexCount * elementSize;
        void* p = std::malloc( bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    uintptr_t reallocIndicesRaw( uintptr_t ptrVal, size_t newIndexCount, int elementSize )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( newIndexCount == 0 )
        {
            std::free( ptr );
            return 0;
        }
        if ( elementSize != 2 && elementSize != 4 ) return 0;
        size_t bytes = newIndexCount * elementSize;
        void* p = std::realloc( ptr, bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    void freeIndicesRaw( uintptr_t ptrVal )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( ptr ) std::free( ptr );
    }


    void fillDemoVerticesRaw( uintptr_t ptrVal, size_t vertexCount,
                            float xOffset, float yOffset, float zOffset )
    {
        if ( ptrVal == 0 ) return;
        float* f = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );

        for ( size_t i = 0; i < vertexCount; ++i )
        {
            f[i * 3 + 0] = static_cast< float >( i ) + xOffset; // x
            f[i * 3 + 1] = 0.0f + yOffset;                  // y
            f[i * 3 + 2] = 0.0f + zOffset;                  // z
        }
    }
    void modifyVerticesRaw( uintptr_t ptrVal, size_t vertexCount,
                       float xOffset, float yOffset, float zOffset )
    {
        if ( ptrVal == 0 ) return;
        float* f = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );

        for ( size_t i = 0; i < vertexCount; ++i )
        {
            f[i * 3 + 0] += xOffset; // x
            f[i * 3 + 1] += yOffset; // y
            f[i * 3 + 2] += zOffset; // z
        }
    }

    void fillDemoIndicesRaw( uintptr_t ptrVal, size_t indexCount, int elementSize, uint32_t offset )
    {
        if ( ptrVal == 0 ) return;
        void* base = reinterpret_cast< void* >( ptrVal );

        if ( elementSize == 2 )
        {
            uint16_t* idx = reinterpret_cast< uint16_t* >( base );
            for ( size_t i = 0; i < indexCount; ++i ) idx[i] = static_cast< uint16_t >( i + offset );
        }
        else
        {
            uint32_t* idx = reinterpret_cast< uint32_t* >( base );
            for ( size_t i = 0; i < indexCount; ++i ) idx[i] = static_cast< uint32_t >( i + offset );
        }
    }
    void modifyIndicesRaw( uintptr_t ptrVal, size_t indexCount, int elementSize, uint32_t offset )
    {
        if ( ptrVal == 0 ) return;
        void* base = reinterpret_cast< void* >( ptrVal );

        if ( elementSize == 2 )
        {
            uint16_t* idx = reinterpret_cast< uint16_t* >( base );
            for ( size_t i = 0; i < indexCount; ++i ) idx[i] += static_cast< uint16_t >( offset );
        }
        else
        {
            uint32_t* idx = reinterpret_cast< uint32_t* >( base );
            for ( size_t i = 0; i < indexCount; ++i ) idx[i] += offset;
        }
    }

} // extern "C"


/// FIXME
// 
// A more convenient API: directly create and return a TypedArray (internally using malloc).
// These functions return a TypedArray that can be used directly on the JS side (zero-copy).
// 
// NOTE: In `typed_memory_view(length, ptr)`, the length refers to the number of elements (NOT the byte size).
//   - For vertices: length = vertexCount * 3 (number of floats)
//   - For indices: length = indexCount (number of `uint16`/`uint32`)
// 
val getVerticesMV( uintptr_t ptrVal, size_t vertexCount )
{
    if ( ptrVal == 0 ) return val::null();
    float* p = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );
    return val( typed_memory_view( vertexCount * 3, p ) );
}
val getIndicesMV( uintptr_t ptrVal, size_t indexCount, int elementSize )
{
    if ( ptrVal == 0 ) return val::null();
    void* p = reinterpret_cast< void* >( ptrVal );
    if ( elementSize == 2 )
    {
        return val( typed_memory_view( indexCount, reinterpret_cast< uint16_t* >( p ) ) );
    }
    else
    {
        return val( typed_memory_view( indexCount, reinterpret_cast< uint32_t* >( p ) ) );
    }
}
val createVerticesMV( size_t vertexCount )
{
    uintptr_t ptr = createVerticesRaw( vertexCount );
    if ( ptr == 0 ) return val::null();
    return getVerticesMV( ptr, vertexCount );
}
val createIndicesMV( size_t indexCount, int elementSize )
{
    uintptr_t ptr = createIndicesRaw( indexCount, elementSize );
    if ( ptr == 0 ) return val::null();
    return getIndicesMV( ptr, indexCount, elementSize );
}
///


EMSCRIPTEN_BINDINGS( WasmMeshBridgeModule )
{
    // raw pointer (as number) APIs
    function( "createVerticesRaw", &createVerticesRaw );
    function( "reallocVerticesRaw", &reallocVerticesRaw );
    function( "freeVerticesRaw", &freeVerticesRaw );

    function( "createIndicesRaw", &createIndicesRaw );
    function( "reallocIndicesRaw", &reallocIndicesRaw );
    function( "freeIndicesRaw", &freeIndicesRaw );

    function( "fillDemoVerticesRaw", &fillDemoVerticesRaw );
    function( "modifyVerticesRaw", &modifyVerticesRaw );
    function( "fillDemoIndicesRaw", &fillDemoIndicesRaw );
    function( "modifyIndicesRaw", &modifyIndicesRaw );


    ///
    // view-returning APIs
    function( "getVerticesMV", &getVerticesMV );
    function( "getIndicesMV", &getIndicesMV );

    // convenience: directly return TypedArray
    function( "createVerticesMV", &createVerticesMV );
    function( "createIndicesMV", &createIndicesMV );
    ///
}
