#include <cstdint>
#include <cstdlib>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRIdentifyVertices.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;
using namespace MeshBuilder;


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
    uintptr_t createVerticesRaw( size_t verticesCount )
    {
        if ( verticesCount == 0 ) return 0;
        size_t bytes = verticesCount * 3 * sizeof( float );
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


    uintptr_t createIndicesRaw( size_t indicesCount, int BYTES_PER_ELEMENT )
    {
        if ( indicesCount == 0 ) return 0;
        if ( BYTES_PER_ELEMENT != 2 && BYTES_PER_ELEMENT != 4 ) return 0;
        size_t bytes = indicesCount * BYTES_PER_ELEMENT;
        void* p = std::malloc( bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    uintptr_t reallocIndicesRaw( uintptr_t ptrVal, size_t newIndexCount, int BYTES_PER_ELEMENT )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( newIndexCount == 0 )
        {
            std::free( ptr );
            return 0;
        }
        if ( BYTES_PER_ELEMENT != 2 && BYTES_PER_ELEMENT != 4 ) return 0;
        size_t bytes = newIndexCount * BYTES_PER_ELEMENT;
        void* p = std::realloc( ptr, bytes );
        return reinterpret_cast< uintptr_t >( p );
    }
    void freeIndicesRaw( uintptr_t ptrVal )
    {
        void* ptr = reinterpret_cast< void* >( ptrVal );
        if ( ptr ) std::free( ptr );
    }


    void fillDemoVerticesRaw( uintptr_t ptrVal, size_t verticesCount,
                            float xOffset, float yOffset, float zOffset )
    {
        if ( ptrVal == 0 ) return;
        float* f = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );

        for ( size_t i = 0; i < verticesCount; ++i )
        {
            f[i * 3 + 0] = static_cast< float >( i ) + xOffset; // x
            f[i * 3 + 1] = 0.0f + yOffset;                  // y
            f[i * 3 + 2] = 0.0f + zOffset;                  // z
        }
    }
    void modifyVerticesRaw( uintptr_t ptrVal, size_t verticesCount,
                       float xOffset, float yOffset, float zOffset )
    {
        if ( ptrVal == 0 ) return;
        float* f = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );

        for ( size_t i = 0; i < verticesCount; ++i )
        {
            f[i * 3 + 0] += xOffset; // x
            f[i * 3 + 1] += yOffset; // y
            f[i * 3 + 2] += zOffset; // z
        }
    }

    void fillDemoIndicesRaw( uintptr_t ptrVal, size_t indicesCount, int BYTES_PER_ELEMENT, uint32_t offset )
    {
        if ( ptrVal == 0 ) return;
        void* base = reinterpret_cast< void* >( ptrVal );

        if ( BYTES_PER_ELEMENT == 2 )
        {
            uint16_t* idx = reinterpret_cast< uint16_t* >( base );
            for ( size_t i = 0; i < indicesCount; ++i ) idx[i] = static_cast< uint16_t >( i + offset );
        }
        else
        {
            uint32_t* idx = reinterpret_cast< uint32_t* >( base );
            for ( size_t i = 0; i < indicesCount; ++i ) idx[i] = static_cast< uint32_t >( i + offset );
        }
    }
    void modifyIndicesRaw( uintptr_t ptrVal, size_t indicesCount, int BYTES_PER_ELEMENT, uint32_t offset )
    {
        if ( ptrVal == 0 ) return;
        void* base = reinterpret_cast< void* >( ptrVal );

        if ( BYTES_PER_ELEMENT == 2 )
        {
            uint16_t* idx = reinterpret_cast< uint16_t* >( base );
            for ( size_t i = 0; i < indicesCount; ++i ) idx[i] += static_cast< uint16_t >( offset );
        }
        else
        {
            uint32_t* idx = reinterpret_cast< uint32_t* >( base );
            for ( size_t i = 0; i < indicesCount; ++i ) idx[i] += offset;
        }
    }

} // extern "C"


///
// 
// A more convenient API: directly create and return a TypedArray (internally using malloc).
// These functions return a TypedArray that can be used directly on the JS side (zero-copy).
// 
// NOTE: In `typed_memory_view(length, ptr)`, the length refers to the number of elements (NOT the byte size).
//   - For vertices: length = verticesCount * 3 (number of floats)
//   - For indices: length = indicesCount (number of `uint16`/`uint32`)
// 
val getVerticesMV( uintptr_t ptrVal, size_t verticesCount )
{
    if ( ptrVal == 0 ) return val::null();
    float* p = reinterpret_cast< float* >( reinterpret_cast< void* >( ptrVal ) );
    return val( typed_memory_view( verticesCount * 3, p ) );
}
val getIndicesMV( uintptr_t ptrVal, size_t indicesCount, int BYTES_PER_ELEMENT )
{
    if ( ptrVal == 0 ) return val::null();
    void* p = reinterpret_cast< void* >( ptrVal );
    if ( BYTES_PER_ELEMENT == 2 )
    {
        return val( typed_memory_view( indicesCount, reinterpret_cast< uint16_t* >( p ) ) );
    }
    else
    {
        return val( typed_memory_view( indicesCount, reinterpret_cast< uint32_t* >( p ) ) );
    }
}
val createVerticesMV( size_t verticesCount )
{
    uintptr_t ptr = createVerticesRaw( verticesCount );
    if ( ptr == 0 ) return val::null();
    return getVerticesMV( ptr, verticesCount );
}
val createIndicesMV( size_t indicesCount, int BYTES_PER_ELEMENT )
{
    uintptr_t ptr = createIndicesRaw( indicesCount, BYTES_PER_ELEMENT );
    if ( ptr == 0 ) return val::null();
    return getIndicesMV( ptr, indicesCount, BYTES_PER_ELEMENT );
}
///


///
Mesh* buildMesh( uintptr_t vPtr, uintptr_t iPtr, size_t indicesCount )
{
    if ( vPtr == 0 || iPtr == 0 ) return nullptr;

    const float* verticesPtr = reinterpret_cast< const float* >( vPtr );
    const uint32_t* indicesPtr = reinterpret_cast< const uint32_t* >( iPtr );

    int numTris = indicesCount / 3;
    MeshBuilder::VertexIdentifier vi = MRJS::createVertexIdentifier( verticesPtr, indicesPtr, numTris );
    auto t = vi.takeTriangulation();

    Mesh* mesh = new Mesh( Mesh::fromTriangles( vi.takePoints(), t ) );
    return mesh;
}
void freeMesh( Mesh* meshPtr )
{
    if ( meshPtr ) delete meshPtr;
}

size_t getMeshVertexCount( Mesh* mesh )
{
    if ( !mesh ) return 0;
    return mesh->points.size();
}
size_t getMeshIndexCount( Mesh* mesh )
{
    if ( !mesh ) return 0;

    const Triangulation tris_ = mesh->topology.getTriangulation();
    size_t triangleCount = tris_.size();
    size_t triElementCount = triangleCount * 3;
    return triElementCount; // tri_count * 3
}
void writeMeshVertices( Mesh* mesh, uintptr_t vPtr )
{
    if ( !mesh || vPtr == 0 ) return;
    const auto& points = mesh->points;
    size_t pointCount = points.size();
    if ( pointCount == 0 ) return;

    // points.data() returns Vector3f*, three floats are consecutive
    const float* src = reinterpret_cast< const float* >( points.data() );
    float* dst = reinterpret_cast< float* >( reinterpret_cast< void* >( vPtr ) );

    // Copy pointCount * 3 floats
    std::memcpy( dst, src, pointCount * 3 * sizeof( float ) );
}
void writeMeshIndices( Mesh* mesh, uintptr_t iPtr, int BYTES_PER_ELEMENT )
{
    if ( !mesh || iPtr == 0 ) return;
    if ( BYTES_PER_ELEMENT != 2 && BYTES_PER_ELEMENT != 4 ) return;

    Triangulation tris = mesh->topology.getTriangulation();
    size_t triCount = tris.size();
    if ( triCount == 0 ) return;

    size_t triElementCount = triCount * 3;
    const void* srcBytes = static_cast< const void* >( tris.data() );

    // runtime checks
    constexpr bool three_trivial = std::is_trivially_copyable<ThreeVertIds>::value;
    constexpr bool vertid_trivial = std::is_trivially_copyable<VertId>::value;
    const size_t vertid_size = sizeof( VertId );

    if ( BYTES_PER_ELEMENT == 4 )
    {
        uint32_t* out = reinterpret_cast< uint32_t* >( reinterpret_cast< void* >( iPtr ) );

        // fast path: VertId is integer-sized 4 bytes and layouts match
        if ( three_trivial && vertid_trivial && vertid_size == sizeof( uint32_t ) )
        {
            std::memcpy( out, srcBytes, triElementCount * sizeof( uint32_t ) );
            return;
        }

        // fallback: convert element-by-element
        size_t k = 0;
        for ( const ThreeVertIds& t : tris )
        {
            out[k++] = static_cast< uint32_t >( t[0] );
            out[k++] = static_cast< uint32_t >( t[1] );
            out[k++] = static_cast< uint32_t >( t[2] );
        }
    }
    else // BYTES_PER_ELEMENT == 2
    {
        uint16_t* out = reinterpret_cast< uint16_t* >( reinterpret_cast< void* >( iPtr ) );

        // if VertId is 2 bytes, direct memcpy ok
        if ( three_trivial && vertid_trivial && vertid_size == sizeof( uint16_t ) )
        {
            std::memcpy( out, srcBytes, triElementCount * sizeof( uint16_t ) );
            return;
        }

        // fallback: per-element with clamp to 0xFFFF
        size_t k = 0;
        for ( const ThreeVertIds& t : tris )
        {
            uint32_t v0 = static_cast< uint32_t >( t[0] );
            uint32_t v1 = static_cast< uint32_t >( t[1] );
            uint32_t v2 = static_cast< uint32_t >( t[2] );
            out[k++] = ( v0 > 0xFFFFu ) ? static_cast< uint16_t >( 0xFFFFu ) : static_cast< uint16_t >( v0 );
            out[k++] = ( v1 > 0xFFFFu ) ? static_cast< uint16_t >( 0xFFFFu ) : static_cast< uint16_t >( v1 );
            out[k++] = ( v2 > 0xFFFFu ) ? static_cast< uint16_t >( 0xFFFFu ) : static_cast< uint16_t >( v2 );
        }
    }
}

emscripten::val exportMeshToBuffers( Mesh* mesh,
                                     uintptr_t vPtr, size_t verticesCount,
                                     uintptr_t iPtr, size_t indicesCount,
                                     int requestedElementSize )
{
    emscripten::val result = emscripten::val::object();

    if ( !mesh )
    {
        result.set( "ok", false );
        result.set( "error", std::string( "mesh is null" ) );
        return result;
    }

    // compute required sizes
    size_t needVerticesCount = getMeshVertexCount( mesh ); // number of vertices
    size_t needIndicesCount = getMeshIndexCount( mesh );  // number of indices (tri_count * 3)

    // choose index element size: if vertex count exceeds 65535 force 4 bytes
    int BYTES_PER_ELEMENT = requestedElementSize;
    if ( needVerticesCount > 65535 ) BYTES_PER_ELEMENT = 4;

    // --- realloc vertices if needed ---
    uintptr_t newVPtr = vPtr;
    if ( needVerticesCount > verticesCount )
    {
        newVPtr = reallocVerticesRaw( vPtr, needVerticesCount );
        if ( newVPtr == 0 && needVerticesCount != 0 )
        {
            result.set( "ok", false );
            result.set( "error", std::string( "reallocVerticesRaw failed" ) );
            return result;
        }
    }

    // --- realloc indices if needed OR if requested element size changed ---
    uintptr_t newIPtr = iPtr;
    if ( needIndicesCount > indicesCount || BYTES_PER_ELEMENT != requestedElementSize )
    {
        newIPtr = reallocIndicesRaw( iPtr, needIndicesCount, BYTES_PER_ELEMENT );
        if ( newIPtr == 0 && needIndicesCount != 0 )
        {
            // rollback vertex realloc? (optional)
            result.set( "ok", false );
            result.set( "error", std::string( "reallocIndicesRaw failed" ) );
            return result;
        }
    }

    // --- write back mesh data into buffers ---
    writeMeshVertices( mesh, newVPtr );
    writeMeshIndices( mesh, newIPtr, BYTES_PER_ELEMENT );

    // return new pointers & counts
    result.set( "ok", true );
    result.set( "verticesPtr", ( double )newVPtr ); // use double to represent uintptr_t in JS
    result.set( "indicesPtr", ( double )newIPtr );
    result.set( "verticesCount", ( double )needVerticesCount );
    result.set( "indicesCount", ( double )needIndicesCount );
    result.set( "BYTES_PER_ELEMENT", ( int )BYTES_PER_ELEMENT );

    return result;
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


    function( "buildMesh", &buildMesh, allow_raw_pointers());
    function( "freeMesh", &freeMesh, allow_raw_pointers() );
    function( "getMeshVertexCount", &getMeshVertexCount, allow_raw_pointers() );
    function( "getMeshIndexCount", &getMeshIndexCount, allow_raw_pointers() );
    function( "writeMeshVertices", &writeMeshVertices, allow_raw_pointers() );
    function( "writeMeshIndices", &writeMeshIndices, allow_raw_pointers() );
    function( "exportMeshToBuffers", &exportMeshToBuffers, allow_raw_pointers() );
}
