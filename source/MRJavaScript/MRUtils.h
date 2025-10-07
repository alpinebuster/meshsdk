#pragma once

#include <optional>
#include <type_traits>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRIdentifyVertices.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRVector4.h>
#include <MRMesh/MRMeshOrPoints.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MREdgePaths.h>

using namespace emscripten;
using namespace MR;


namespace MRJS
{

std::function<bool( float )> createProgressCallback( val jsCallback );

Vector3f arrayToVector3f( const val& arr );
val vector3fToArray( const Vector3f& v );


/**
 * @brief Helper function to convert flat coordinate array to Vector3f points
 * This design is more JavaScript-friendly than individual Point3D objects
 * coordinates should contain [x1,y1,z1, x2,y2,z2, x3,y3,z3, ...] for each point
 */
[[nodiscard]] VertCoords parseJSVertices( const std::vector<float>& coordinates );
[[nodiscard]] Triangulation parseJSIndices( const std::vector<int>& indices );


val findBottomPosition( Mesh& mesh, Vector3f dir);


std::pair<Mesh, Mesh> returnParts( Mesh& mesh, const std::vector<EdgePath>& cut );
std::pair<Mesh, Mesh> returnParts( Mesh& mesh, FaceBitSet& fb );


MeshBuilder::VertexIdentifier createVertexIdentifier( const float* verticesPtr, const uint32_t* indicesPtr, int numTris );


/// Finds all triangles of a mesh that having normals oriented toward the camera in this viewport
// REF `source/MRViewer/MRViewport.cpp`
FaceBitSet findLookingFaces( const Mesh& mesh, const AffineXf3f& meshToWorld, Vector3f lookDirection, bool orthographic );
Mesh findLookingSilhouetteConvexHull( const Mesh& mesh, Vector3f lookDirection );
///


// NOTE: Export mesh data using `typed_memory_view()`
// 
//  unsigned char*  -> Uint8Array
//  char*	        -> Int8Array
//  unsigned short*	-> Uint16Array
//  short*	        -> Int16Array
//  unsigned int*	-> Uint32Array
//  int*	        -> Int32Array
//  float*	        -> Float32Array
//  double*	        -> Float64Array
// 
val exportMeshMemoryView( const Mesh& meshToExport );


// Impl：Automatically registering elements `0, 1, …, N − 1` at compile time
template<typename T, std::size_t... Is>
void bindStdArrayImpl( const char* jsName, std::index_sequence<Is...> )
{
    // 1) `sizeof...(Is)` is the number of integers in the pack—that is, `N`.
    // 
    // Therefore:
    //   `value_array<std::array<T, sizeof...(Is)>>( jsName )`
    // is equivalent to
    //   `value_array<std::array<T, N>>( jsName )`
    // 
    auto arr = value_array<std::array<T, sizeof...( Is )>>( jsName );
    // 2) This is a common trick combining pack-expansion, the comma operator, and an initializer list. The effect is to invoke:
    // 
    //   arr.element( emscripten::index<0>() );
    //   arr.element( emscripten::index<1>() );
    //   …
    //   arr.element( emscripten::index<N-1>() );
    // 
    // all at compile time
    // 
    ( void )std::initializer_list<int>{ ( arr.element( emscripten::index<Is>() ), 0 )... };
}
/**
 *@brief Just specify `T`, `N`, and the `jsName`.
 * The compiler generates the index sequence `0…N-1` and calls `bindStdArrayImpl`, which in turn registers every element.
 *
 * @tparam T 
 * @tparam N 
 * @param jsName 
 */
template<typename T, std::size_t N>
void bindStdArray( const char* jsName )
{
    bindStdArrayImpl<T>( jsName, std::make_index_sequence<N>{} );
}

} // namespace MRJS
