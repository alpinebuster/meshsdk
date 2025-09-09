#include <string>
#include <vector>
#include <memory>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRIdentifyVertices.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRVectorTraits.h>
#include <MRMesh/MRMeshFillHole.h>
#include <MRMesh/MRSurroundingContour.h>
#include <MRMesh/MRFillContourByGraphCut.h>
#include <MRMesh/MREdgeMetric.h>
#include <MRMesh/MREdgePoint.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRLine3.h>
#include <MRMesh/MRMeshProject.h>
#include <MRMesh/MRContoursCut.h>
#include <MRMesh/MRPolylineProject.h>
#include <MRMesh/MRMeshBoolean.h>
#include <MRMesh/MROneMeshContours.h>
#include <MRMesh/MRMeshIntersect.h>
#include <MRMesh/MRParallelFor.h>
#include <MRMesh/MRFillContour.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MRSignDetectionMode.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRMeshBuilderTypes.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRTriMesh.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRPositionVertsSmoothly.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRTimer.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRAABBTree.h>
#include <MRMesh/MRAABBTreePoints.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRPartMapping.h>
#include <MRMesh/MRLineSegm.h>
#include <MRMesh/MRLineSegm3.h>
#include <MRMesh/MRMeshMath.h>
#include <MRMesh/MRPointOnFace.h>
#include <MRMesh/MRMeshComponents.h>
#include <MRMesh/MRUniteManyMeshes.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRMesh.h>

#include <MRVoxels/MRFixUndercuts.h>
#include <MRVoxels/MRRebuildMesh.h>
#include <MRVoxels/MROffset.h>

#include "MRMesh.h"
#include "MRUtils.h"

using namespace emscripten;
using namespace MR;
using namespace MeshBuilder;

namespace MRJS 
{

///
val createMaxillaGypsumBaseImplTest( Mesh& mesh, EdgeId maxAreaHole, VertId minVert, Vector3f dir, float extensionBottom, float extensionBottomToGypsumBase )
{
	assert( extensionBottom >= 0 && "extensionBottom must be a positive value or 0" );
	assert( extensionBottomToGypsumBase > 0 && "extensionBottomToGypsumBase must be a positive value" );

	if ( dir.length() != 1.0f ) dir = dir.normalized();
	Vector3f transEBottom = mesh.points[minVert] - extensionBottom * dir;

	val obj = val::object();
	if ( extensionBottomToGypsumBase > 0 )
	{
		Vector3f transEBottomToGypsumBase = mesh.points[minVert] - ( extensionBottom + extensionBottomToGypsumBase ) * dir;

		///
		Mesh mMaxillaBase = findLookingSilhouetteConvexHull( mesh, dir );
		Mesh mMaxillaBaseCopy = mMaxillaBase;

		auto moveMaxillaBaseDistance = dot( dir, transEBottomToGypsumBase );
		mMaxillaBase.transform( MR::AffineXf3f::translation( moveMaxillaBaseDistance * dir ) );
		Mesh mMaxillaBaseTransformedCopy = mMaxillaBase;

		auto eGypsumBase = mMaxillaBase.topology.findHoleRepresentiveEdges();
		extendHole( mMaxillaBase, eGypsumBase[0], Plane3f::fromDirAndPt( -dir, transEBottom ) );
		// Flip normals
		mMaxillaBase.topology.flipOrientation();
		Mesh mMaxillaBaseTransformedExtendedHoleCopy = mMaxillaBase;
		///


		///
		// NOTE: `extenHole()` will change the `mesh`
		extendHole( mesh, maxAreaHole, Plane3f::fromDirAndPt( dir, transEBottom ) );
		///


		///
		// Connect two meshes
		mesh.addMesh( mMaxillaBase );
		buildCylinderBetweenTwoHoles( mesh );
		// these holes have exact matching by vertices
		MeshBuilder::uniteCloseVertices( mesh, 0.0f, true );
		///
	

		val meshData = MRJS::exportMeshMemoryView( mesh );
		val mMaxillaBaseCopyData = MRJS::exportMeshMemoryView( mMaxillaBaseCopy );
		val mMaxillaBaseTransformedCopyData = MRJS::exportMeshMemoryView( mMaxillaBaseTransformedCopy );
		val mMaxillaBaseTransformedExtendedHoleCopyData = MRJS::exportMeshMemoryView( mMaxillaBaseTransformedExtendedHoleCopy );


		obj.set( "success", true );
		obj.set( "mesh", mesh );
		obj.set( "meshMV", meshData );
		obj.set( "mMaxillaBaseCopyData", mMaxillaBaseCopyData );
		obj.set( "mMaxillaBaseTransformedCopyData", mMaxillaBaseTransformedCopyData );
		obj.set( "mMaxillaBaseTransformedExtendedHoleCopyData", mMaxillaBaseTransformedExtendedHoleCopyData );
	}
	else
	{
		EdgeId newE = extendHole( mesh, maxAreaHole, Plane3f::fromDirAndPt( dir, transEBottom ) );
		fillHole( mesh, newE );
		val meshData = MRJS::exportMeshMemoryView( mesh );

		obj.set( "success", true );
		obj.set( "mesh", mesh );
		obj.set( "meshMV", meshData );
	}

	return obj;
}
val createMaxillaGypsumBaseImpl( Mesh& mesh, EdgeId maxAreaHole, VertId minVert, Vector3f dir, float extensionBottom, float extensionBottomToGypsumBase )
{
	assert( extensionBottom >= 0 && "extensionBottom must be a positive value or 0" );
	assert( extensionBottomToGypsumBase > 0 && "extensionBottomToGypsumBase must be a positive value" );

	if ( dir.length() != 1.0f ) dir = dir.normalized();
	Vector3f transEBottom = mesh.points[minVert] - extensionBottom * dir;

	val obj = val::object();
	if ( extensionBottomToGypsumBase > 0 )
	{
		Vector3f transEBottomToGypsumBase = mesh.points[minVert] - ( extensionBottom + extensionBottomToGypsumBase ) * dir;

		///
		Mesh mMaxillaBase = findLookingSilhouetteConvexHull( mesh, dir );
		auto moveMaxillaBaseDistance = dot( dir, transEBottomToGypsumBase );
		mMaxillaBase.transform( MR::AffineXf3f::translation( moveMaxillaBaseDistance * dir ) );
		
		auto eGypsumBase = mMaxillaBase.topology.findHoleRepresentiveEdges();
		// EdgeId curREGypsumBase = extendHole( mMaxillaBase, eGypsumBase[0], Plane3f::fromDirAndPt( -dir, transEBottom ) );
		extendHole( mMaxillaBase, eGypsumBase[0], Plane3f::fromDirAndPt( -dir, transEBottom ) );
		// Flip normals
		mMaxillaBase.topology.flipOrientation();
		///


		///
		// NOTE: `extenHole()` will change the `mesh`
		// EdgeId curRE = extendHole( mesh, maxAreaHole, Plane3f::fromDirAndPt( dir, transEBottom ) );
		extendHole( mesh, maxAreaHole, Plane3f::fromDirAndPt( dir, transEBottom ) );
		///


		// Connect two meshes
		mesh.addMesh( mMaxillaBase );


		buildCylinderBetweenTwoHoles( mesh );


		///
		// these holes have exact matching by vertices
		// MeshBuilder::uniteCloseVertices( mesh, 0.0f, true );
		RebuildMeshSettings params;
		params.voxelSize = suggestVoxelSize(mesh, 5e6);

		auto newMesh = rebuildMesh(mesh, params);
		///
	

		val meshData = MRJS::exportMeshMemoryView( newMesh.value() );

		obj.set( "success", true );
		obj.set( "mesh", mesh );
		obj.set( "meshMV", meshData );
	}
	else
	{
		EdgeId newE = extendHole( mesh, maxAreaHole, Plane3f::fromDirAndPt( dir, transEBottom ) );
		fillHole( mesh, newE );
		val meshData = MRJS::exportMeshMemoryView( mesh );

		obj.set( "success", true );
		obj.set( "mesh", mesh );
		obj.set( "meshMV", meshData );
	}

	return obj;
}

val createMandibleGypsumBaseImpl( Mesh& mesh, EdgeId maxAreaHole, Vector3f dir, float extension )
{
	EdgeId newEdgeId = buildBottom( mesh, maxAreaHole, dir, extension );
	fillHole( mesh, newEdgeId );

	///
	RebuildMeshSettings params;
	params.voxelSize = suggestVoxelSize(mesh, 5e6);

	auto newMesh = rebuildMesh(mesh, params);
	///
	
	val meshData = MRJS::exportMeshMemoryView( newMesh.value() );

	val obj = val::object();
	obj.set( "success", true );
	obj.set( "mesh", mesh );
	obj.set( "meshMV", meshData );

	return obj;
}
///

}


EMSCRIPTEN_BINDINGS( MeshModule )
{
	class_<Mesh>( "Mesh" )
		.smart_ptr<std::shared_ptr<Mesh>>( "MeshSharedPtr" )
		.constructor<>()

		.property( "topology", &Mesh::topology, return_value_policy::reference() )
        .function( "getTopology", optional_override( []( Mesh& self ) {
            return &self.topology;
        }), allow_raw_pointers() )
		.property( "points", &Mesh::points )
        .function( "getPoints", optional_override( []( Mesh& self ) {
            return &self.points;
        }), allow_raw_pointers() )

		///
		// NOTE: Let `emscripten` to handle exceptions, it will throw them on the JS side
		// 
		// Example usage:
		// 
		//  ```js
		//  /// Vertices
		//  // 1) allocate `nVerts*3` floats in WASM
		//  const verticesCount = vertices.length; 
		//  // NOTE: In `_malloc`, the specified value is in bytes, not in the number of elements
		//  // Each element in `Float32Array` occupies **4 bytes** (32 bits = 4 bytes)
		//  const verticesPtr = editor.MeshSDK._malloc( verticesCount * 4 );
		//  // 2) construct a JS Float32Array that _views_ the WASM heap:
		//  const jsVertices = new Float32Array( editor.MeshSDK.HEAPF32.buffer, verticesPtr, verticesCount );
		//  // 3) copy into it (once), or let your own code fill it:
		//  jsVertices.set( vertices );
		//  ///
		// 
		// 
		// 	/// Indices
		// 	const indicesCount = indices.length;
		// 	const indicesPtr = editor.MeshSDK._malloc( indicesCount * 4 );
		// 	const jsIndices = new Uint32Array( editor.MeshSDK.HEAPU32.buffer, indicesPtr, indicesCount );
		// 	jsIndices.set( indices );
		// 	///
		// 
		// 
		//  try {
		//  	const mesh = Module.fromTrianglesMemoryView( jsVertices, jsIndices );
		// 
		//      // ...
		// 
		//      // NOTE: This is IMPORTANT!!!
		//      mesh.delete();
		//  } catch ( error ) {
		//  	console.error( 'Error creating mesh:', error.message );
		//  }
		//  ```
		// 
		.class_function( "fromTrianglesMemoryView", 
			optional_override( [] ( const val& verticesArray, const val& indicesArray, bool duplicateNonManifoldVertices ) -> Mesh
			{
				try
				{
					if ( !verticesArray.instanceof( val::global( "Float32Array" ) ) )
					{
						throw std::runtime_error( "vertices must be Float32Array" );
					}
					if ( !indicesArray.instanceof( val::global( "Uint32Array" ) ) )
					{
						throw std::runtime_error( "indices must be Uint32Array" );
					}

					int verticesLength = verticesArray["length"].as<int>();
					int indicesLength = indicesArray["length"].as<int>();

					if ( verticesLength % 3 != 0 )
					{
						throw std::runtime_error( "vertices array length must be divisible by 3" );
					}
					if ( indicesLength % 3 != 0 )
					{
						throw std::runtime_error( "indices array length must be divisible by 3" );
					}


					///
					// NOTE: Directly access the memory of `TypedArray` without copying
					size_t verticesByteOffset = verticesArray["byteOffset"].as<size_t>();
					const float* verticesPtr = reinterpret_cast<const float*>( verticesByteOffset );

					size_t indicesByteOffset = indicesArray["byteOffset"].as<size_t>();
					const uint32_t* indicesPtr = reinterpret_cast<const uint32_t*>( indicesByteOffset );
					///


					///
					int numTris = indicesLength / 3;
					MeshBuilder::VertexIdentifier vi = MRJS::createVertexIdentifier( verticesPtr, indicesPtr, numTris );
    				auto t = vi.takeTriangulation();
					///


					if ( duplicateNonManifoldVertices )
						return Mesh::fromTrianglesDuplicatingNonManifoldVertices( vi.takePoints(), t );
					else
						return Mesh::fromTriangles( vi.takePoints(), t );
				}
				catch ( const std::exception& e )
				{
					// Or return an empty `Mesh`
					// return Mesh();
					throw std::runtime_error( std::string( e.what() ) );
				}
			} ),
			allow_raw_pointers()
		)
		// 
		// Example usage
		// 
		//  ```js
		//  // Three.js geometry
		//  const geometry = new THREE.BufferGeometry();
		//  const vertices = geometry.getAttribute('position').array; // `Float32Array`
		//  const indices = geometry.getIndex().array; // `Uint32Array`
		//  
		//  const mesh = Mesh.fromTrianglesArray( vertices, indices );
		// 
		//  // ...
		// 
		//  // NOTE: This is IMPORTANT!!!
		//  mesh.delete();
		//  ```
		// 
		.class_function( "fromTrianglesArray",
			optional_override( [] ( const val& verticesArray, const val& indicesArray, bool duplicateNonManifoldVertices ) -> Mesh
			{
				try
				{
					if ( !verticesArray.instanceof( val::global( "Float32Array" ) ) )
					{
						throw std::runtime_error( "vertices must be Float32Array" );
					}
					if ( !indicesArray.instanceof( val::global( "Uint32Array" ) ) )
					{
						throw std::runtime_error( "indices must be Uint32Array" );
					}

					int verticesLength = verticesArray["length"].as<int>();
					int indicesLength = indicesArray["length"].as<int>();

					if ( verticesLength % 3 != 0 )
					{
						throw std::runtime_error( "vertices array length must be divisible by 3" );
					}
					if ( indicesLength % 3 != 0 )
					{
						throw std::runtime_error( "indices array length must be divisible by 3" );
					}


					///
					std::vector<float> verticesVec = emscripten::convertJSArrayToNumberVector<float>( verticesArray );
					std::vector<uint32_t> indicesVec = emscripten::convertJSArrayToNumberVector<uint32_t>( indicesArray );
					const float* verticesPtr = verticesVec.data();
					const uint32_t* indicesPtr = indicesVec.data();
					///


					///
					int numTris = indicesLength / 3;
					MeshBuilder::VertexIdentifier vi = MRJS::createVertexIdentifier( verticesPtr, indicesPtr, numTris );
    				auto t = vi.takeTriangulation();
					///


					if ( duplicateNonManifoldVertices )
						return Mesh::fromTrianglesDuplicatingNonManifoldVertices( vi.takePoints(), t );
					else
						return Mesh::fromTriangles( vi.takePoints(), t );
				}
				catch ( const std::exception& e )
				{
					throw std::runtime_error( std::string( e.what() ) );
				}
			} )
		)
		.class_function( "fromTrianglesArrayTest",
			optional_override( [] ( const val& verticesArray, const val& indicesArray, bool duplicateNonManifoldVertices ) -> val
			{
				val meshObj = val::object();

				try
				{
					if ( !verticesArray.instanceof( val::global( "Float32Array" ) ) )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "vertices must be Float32Array" );
						return meshObj;
					}
					if ( !indicesArray.instanceof( val::global( "Uint32Array" ) ) )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "indices must be Uint32Array" );
						return meshObj;
					}

					int verticesLength = verticesArray["length"].as<int>();
					int indicesLength = indicesArray["length"].as<int>();

					if ( verticesLength % 3 != 0 )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "vertices array length must be divisible by 3" );
						return meshObj;
					}
					if ( indicesLength % 3 != 0 )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "indices array length must be divisible by 3" );
						return meshObj;
					}


					///
					std::vector<float> verticesVec = emscripten::convertJSArrayToNumberVector<float>( verticesArray );
					std::vector<uint32_t> indicesVec = emscripten::convertJSArrayToNumberVector<uint32_t>( indicesArray );
					const float* verticesPtr = verticesVec.data();
					const uint32_t* indicesPtr = indicesVec.data();
					///


					///
					// FIXME: What distinguishes this from `VertexIdentifier`?
					VertCoords verts;
					Triangulation triangles;
					int numVerts = verticesLength / 3;
					int numTris = indicesLength / 3;


					auto fillTris = [&] ( const auto* data )
					{
						triangles.reserve( numTris );
						for ( auto i = 0; i < numTris; i++ )
						{
							int fId = i * 3;
							triangles.push_back( {
								VertId( int( data[fId] ) ),
								VertId( int( data[fId + 1] ) ),
								VertId( int( data[fId + 2] ) )
							}  );
						}
					};
        			fillTris( indicesPtr );


					std::vector<Vector3f> vec;
					auto fillVerts = [&] ( const auto* data )
					{
						vec.resize( numVerts );
						for ( auto i = 0; i < numVerts; i++ )
						{
							auto vId = i * 3;
							vec[i] = Vector3f(
								float( data[vId] ),
								float( data[vId + 1] ),
								float( data[vId + 2] ) 
							);
						}
					};
					fillVerts( verticesPtr );
					verts.vec_ = vec;
					///

					Mesh mesh;
					if ( duplicateNonManifoldVertices )
						mesh = Mesh::fromTrianglesDuplicatingNonManifoldVertices( std::move( verts ), triangles );
					else
						mesh = Mesh::fromTriangles( std::move( verts ), triangles );


					meshObj.set( "success", true );
					meshObj.set( "meshMV", MRJS::exportMeshMemoryView( mesh ) );
					meshObj.set( "mesh", mesh );
					meshObj.set( "triangles", triangles );
					meshObj.set( "verts", verts );
	
	
					///
					auto& topology = mesh.topology;
					meshObj.set( "debug_numFaces", int( topology.numValidFaces() ) );
					meshObj.set( "debug_numEdges", int( topology.edgeSize() ) );
					meshObj.set( "debug_numVerts", int( topology.vertSize() ) );


					auto components = MeshComponents::getAllComponents( mesh );
					if ( components.size() <= 1 ) {
						return meshObj;
					}
					meshObj.set( "debug_componentsBefore", components.size() );
					meshObj.set( "debug_pointsBefore", mesh.points.size() );
					meshObj.set( "debug_firstCompFaceCountBefore", components[0].count() );

					// Create a vector to hold meshes and their pointers
					// std::vector<Mesh> meshes( components.size() );
					// std::vector<const Mesh*> vecMeshes( components.size() );
					// for ( size_t i = 0; i < components.size(); ++i )
					// {
					// 	// Create meshes from separated components
					// 	auto part = Mesh();
					// 	part.addMeshPart( {mesh, &components[i]} );
					// 	meshes[i] = part;
					// 	vecMeshes[i] = &meshes[i];
					// }
					// UniteManyMeshesParams params;
					// params.nestedComponentsMode = NestedComponenetsMode::Merge;
					// params.fixDegenerations = true;

					// auto mergedMesh = *uniteManyMeshes( vecMeshes, params );

					// auto postMergeComponents = MeshComponents::getAllComponents( mergedMesh );
					// meshObj.set( "debug_componentsAfter", postMergeComponents.size() );
					// meshObj.set( "debug_pointsAfter", mergedMesh.points.size() );
					// meshObj.set( "debug_firstCompFaceCountAfter", postMergeComponents[0].count() );
					///

					return meshObj;
				}
				catch ( const std::exception& e )
				{
					meshObj.set( "success", false );
					meshObj.set( "error", std::string( e.what() ) );
					return meshObj;
				}
			} )
		)
		.class_function( "fromTrianglesArrayTestVertexIdentifier",
			optional_override( [] ( const val& verticesArray, const val& indicesArray, bool duplicateNonManifoldVertices ) -> val
			{
				val meshObj = val::object();

				try
				{
					if ( !verticesArray.instanceof( val::global( "Float32Array" ) ) )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "vertices must be Float32Array" );
						return meshObj;
					}
					if ( !indicesArray.instanceof( val::global( "Uint32Array" ) ) )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "indices must be Uint32Array" );
						return meshObj;
					}

					int verticesLength = verticesArray["length"].as<int>();
					int indicesLength = indicesArray["length"].as<int>();

					if ( verticesLength % 3 != 0 )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "vertices array length must be divisible by 3" );
						return meshObj;
					}
					if ( indicesLength % 3 != 0 )
					{
						meshObj.set( "success", false );
						meshObj.set( "error", "indices array length must be divisible by 3" );
						return meshObj;
					}


					///
					std::vector<float> verticesVec = emscripten::convertJSArrayToNumberVector<float>( verticesArray );
					std::vector<uint32_t> indicesVec = emscripten::convertJSArrayToNumberVector<uint32_t>( indicesArray );
					const float* verticesPtr = verticesVec.data();
					const uint32_t* indicesPtr = indicesVec.data();
					///


					///
					int numTris = indicesLength / 3;
					MeshBuilder::VertexIdentifier vi = MRJS::createVertexIdentifier( verticesPtr, indicesPtr, numTris );
    				auto t = vi.takeTriangulation();
					///


					Mesh mesh;
					if ( duplicateNonManifoldVertices )
						mesh = Mesh::fromTrianglesDuplicatingNonManifoldVertices( vi.takePoints(), t );
					else
						mesh = Mesh::fromTriangles( vi.takePoints(), t );


					meshObj.set( "success", true );
					meshObj.set( "meshMV", MRJS::exportMeshMemoryView( mesh ) );
					meshObj.set( "mesh", mesh );
	
	
					///
					auto& topology = mesh.topology;
					meshObj.set( "debug_numFaces", int( topology.numValidFaces() ) );
					meshObj.set( "debug_numEdges", int( topology.edgeSize() ) );
					meshObj.set( "debug_numVerts", int( topology.vertSize() ) );


					auto components = MeshComponents::getAllComponents( mesh );
					if ( components.size() <= 1 ) {
						return meshObj;
					}
					meshObj.set( "debug_componentsBefore", components.size() );
					meshObj.set( "debug_pointsBefore", mesh.points.size() );
					meshObj.set( "debug_firstCompFaceCountBefore", components[0].count() );
					///

					return meshObj;
				}
				catch ( const std::exception& e )
				{
					meshObj.set( "success", false );
					meshObj.set( "error", std::string( e.what() ) );
					return meshObj;
				}
			} )
		)

		.class_function( "getGeometry",
			optional_override( []( Mesh& mesh ) -> val
			{
				val meshData = MRJS::exportMeshMemoryView( mesh );

				val geoObj = val::object();
				geoObj.set( "success", true );
				geoObj.set( "mesh", meshData );

				return geoObj;
			})
		)
		///


		///
		.function( "fromTriangles", &Mesh::fromTriangles )

		.function( "fromTriMesh",
			optional_override( [] ( TriMesh& triMesh, const MeshBuilder::BuildSettings& settings, ProgressCallback cb ) -> Mesh
			{
				return Mesh::fromTriMesh( std::move( triMesh ), settings, cb );
			} )
		)
		.function( "fromTriMeshWithUniquePtr",
			optional_override( [] ( std::unique_ptr<TriMesh> triMesh, const MeshBuilder::BuildSettings& settings, ProgressCallback cb ) -> Mesh
			{
				return Mesh::fromTriMesh( std::move( *triMesh ), settings, cb );
			} ),
			allow_raw_pointers()
		)
		.function( "fromTriMeshWithoutProgressCallback",
			optional_override( [] ( TriMesh& triMesh, const MeshBuilder::BuildSettings& settings ) -> Mesh
			{
				return Mesh::fromTriMesh( std::move( triMesh ), settings );
			} )
		)
		.function( "fromTriMeshWithDefaultSettings",
			optional_override( [] ( TriMesh& triMesh ) -> Mesh
			{
				MeshBuilder::BuildSettings defaultSettings;
				return Mesh::fromTriMesh( std::move( triMesh ), defaultSettings );
			} )
		)

		.function( "fromTrianglesDuplicatingNonManifoldVertices", &Mesh::fromTrianglesDuplicatingNonManifoldVertices, allow_raw_pointers() )
		.function( "fromFaceSoup", &Mesh::fromFaceSoup )
		.function( "fromPointTriples", &Mesh::fromPointTriples )
		///

		.function( "equals", optional_override( [] ( const Mesh& self, const Mesh& other )
		{
			return self == other;
		} ) )

		.function( "orgPnt", &Mesh::orgPnt )
		.function( "destPnt", &Mesh::destPnt )
		.function( "edgeVector", &Mesh::edgeVector )
		.function( "edgeSegment", &Mesh::edgeSegment )

		.function( "edgePoint", select_overload<Vector3f ( EdgeId, float ) const>( &Mesh::edgePoint ))
		.function( "edgePointWithMeshEdgePoint", select_overload<Vector3f ( const MeshEdgePoint& ) const>( &Mesh::edgePoint ))

		.function( "edgeCenter", &Mesh::edgeCenter )

		.function( "getLeftTriPoints", select_overload<void( EdgeId, Vector3f&, Vector3f&, Vector3f& ) const>( &Mesh::getLeftTriPoints ) )
		// FIXME
		// .function( "getLeftTriPointsWithArray3Vector3f", select_overload<void ( EdgeId, std::array<Vector3f, 3>& ) const>( &Mesh::getLeftTriPoints ))
		.function( "getLeftTriPointsWithTriangle3f", select_overload<Triangle3f ( EdgeId ) const>( &Mesh::getLeftTriPoints ))

		.function( "getTriPoints", select_overload<void( FaceId, Vector3f &, Vector3f &, Vector3f & ) const>( &Mesh::getTriPoints ) )
		// FIXME
		// .function( "getTriPointsWithArray3Vector3f", select_overload<void( FaceId, std::array<Vector3f, 3>& ) const>( &Mesh::getTriPoints ) )
		.function( "getTriPointsWithTriangle3f", select_overload<Triangle3f( FaceId ) const>( &Mesh::getTriPoints ) )
	
		.function( "triPoint", &Mesh::triPoint )
		.function( "triCenter", &Mesh::triCenter )
		.function( "triangleAspectRatio", &Mesh::triangleAspectRatio )
		.function( "circumcircleDiameterSq", &Mesh::circumcircleDiameterSq )
		.function( "circumcircleDiameter", &Mesh::circumcircleDiameter )

		.function( "toTriPoint", select_overload<MeshTriPoint( VertId ) const>( &Mesh::toTriPoint ) )
		.function( "toTriPointWithFaceId", select_overload<MeshTriPoint( FaceId, const Vector3f & ) const>( &Mesh::toTriPoint ) )
		.function( "toTriPointWithPointOnFace", select_overload<MeshTriPoint( const PointOnFace& ) const>( &Mesh::toTriPoint ) )
	
		.function( "toEdgePoint", select_overload<MeshEdgePoint( VertId ) const>( &Mesh::toEdgePoint ) )
		.function( "toEdgePointWithEdgeId", select_overload<MeshEdgePoint( EdgeId, const Vector3f & ) const>( &Mesh::toEdgePoint ) )

		.function( "getClosestVertex", select_overload<VertId( const PointOnFace & ) const>( &Mesh::getClosestVertex ) )
		.function( "getClosestVertexWithMeshTriPoint", select_overload<VertId( const MeshTriPoint & p ) const>( &Mesh::getClosestVertex ) )
	
		.function( "getClosestEdge", select_overload<UndirectedEdgeId( const PointOnFace& ) const>( &Mesh::getClosestEdge ) )
		.function( "getClosestEdgeWithMeshTriPoint", select_overload<UndirectedEdgeId( const MeshTriPoint& ) const>( &Mesh::getClosestEdge ) )

		.function( "volume", &Mesh::volume, allow_raw_pointers() )
		.function( "normalWithFaceId", select_overload<Vector3f ( const FaceId ) const>( &Mesh::normal ))
		.function( "normalWithMeshTriPoint", select_overload<Vector3f ( VertId ) const>( &Mesh::normal ))
		.function( "normal", select_overload<Vector3f ( const MeshTriPoint & ) const>( &Mesh::normal ))

		.function( "getBoundingBox", &Mesh::getBoundingBox )
		.function( "computeBoundingBoxWithFaceBitSet", select_overload<Box3f ( const AffineXf3f * ) const>( &Mesh::computeBoundingBox ), allow_raw_pointers() )
		.function( "computeBoundingBox", select_overload<Box3f ( const FaceBitSet*, const AffineXf3f* ) const>( &Mesh::computeBoundingBox ), allow_raw_pointers() )
		.function( "transform", &Mesh::transform, allow_raw_pointers() )
		.function( "addPoint", &Mesh::addPoint )
		.function( "addSeparateEdgeLoop", &Mesh::addSeparateEdgeLoop )
		.function( "addSeparateContours", &Mesh::addSeparateContours, allow_raw_pointers() )
		.function( "attachEdgeLoopPart", &Mesh::attachEdgeLoopPart )
	
		.function( "addMeshWithPartMapping", select_overload<void( const Mesh&, PartMapping, bool )>( &Mesh::addMesh ) )
		.function( "addMesh", select_overload<void (const Mesh &, FaceMap *, VertMap *, WholeEdgeMap *, bool)>( &Mesh::addMesh ), allow_raw_pointers())
		.function( "addMeshPartWithPartMapping", select_overload<void ( const MeshPart &, const PartMapping& )>( &Mesh::addMeshPart ))
		.function( "addMeshPart", select_overload<void ( const MeshPart &, bool,
        const std::vector<EdgePath> &, const std::vector<EdgePath> &, PartMapping )>( &Mesh::addMeshPart ))
		.function( "cloneRegion", &Mesh::cloneRegion )
		
		.function( "packWithPartMapping", select_overload<void( const PartMapping&, bool )>( &Mesh::pack ) )
		.function( "packWithMap", select_overload<void( FaceMap*, VertMap*, WholeEdgeMap*, bool )>( &Mesh::pack ), allow_raw_pointers() )
		.function( "pack", select_overload<Expected<void>( const PackMapping&, ProgressCallback )>( &Mesh::pack ) )

		///
		// NOTE: `copy constructor of 'PackMapping' is implicitly deleted because field 'e' has a deleted copy constructor`
		.function( "packOptimally", 
			optional_override( []( Mesh& self, bool param ) -> std::unique_ptr<PackMapping> {
				// `packOptimally` returns the value by using `std::move()`
				return std::make_unique<PackMapping>( self.packOptimally( param ) );
			}),
			allow_raw_pointers()
		)
		// 
		// NOTE
		// 
		// 1️⃣ `static`: Ensures that `result` is the same object across multiple calls to the function (independent for each thread).
		// 2️⃣ `thread_local`: In a multithreaded context, each thread has its own copy of `result`, avoiding interference and preventing data races.
		// 3️⃣ `return &result;`: Returns a pointer to this static variable to Emscripten, allowing JS to obtain a raw pointer.
		// 
		// 📌 Why do this?
		// - Because `PackMapping` cannot be copied, it can only be moved.
		// - Emscripten defaults to copying return values (it does not support directly returning move-only values).
		// - Using a `thread_local` static variable effectively places `PackMapping` outside the stack, and returning a pointer bypasses the copy restriction.
		// 
		// ⚡ This is an older technique used to expose a non-copyable large object to JS.
		// 
		// ✅ When is it reasonable to use?
		// - Multiple threads will not share the same `result` instance, as `thread_local` ensures each thread has its own copy.
		// - The pointer returned from C++ to JS must be used quickly and not stored for too long or used asynchronously, as the next C++ call will overwrite `result`.
		// - Be cautious: if there is concurrent access in multithreading, or if JS holds the pointer for too long, there is a risk. If JS saves this pointer to a global variable or passes it to asynchronous logic, the next C++ call may have overwritten or released `result`, leading to reading invalid memory.
		// 
		// 🔑 Modern solution:
		// - Use `std::unique_ptr<PackMapping>`, directly returning a smart pointer, allowing `embind` to manage the lifecycle (`embind` has built-in support for return values of type `std::unique_ptr`), which is safer and free from race conditions.
		// 
		.function( "packOptimallyWithThreadLocalPtr",
			optional_override( [] ( Mesh& self, bool param ) -> PackMapping*
			{
				static thread_local PackMapping result;
				result = self.packOptimally( param );
				return &result;
			} ),
			allow_raw_pointers()
		)
		// The JS side must call `.delete()` to release it manually, otherwise it will leak memory!
		.function( "packOptimallyByNew",
			optional_override( [] ( Mesh& self, bool param ) -> PackMapping*
				{
					return new PackMapping( self.packOptimally( param ) );
				} 
			),
			allow_raw_pointers()
		)

		.function( "packOptimallyWithProgressCallback",
			optional_override( []( Mesh& self, bool param, ProgressCallback callback ) -> std::unique_ptr<PackMapping> {
				auto result = self.packOptimally( param, callback );
				
				if ( result.has_value() ) {
					return std::make_unique<PackMapping>( std::move( result.value() ) );
				} else {
					throw std::runtime_error( result.error() );
				}
			}),
			allow_raw_pointers()
		)
		///

		.function( "deleteFaces", &Mesh::deleteFaces, allow_raw_pointers() )

		.function( "projectPointWithPointOnFace", select_overload<bool( const Vector3f&, PointOnFace&, float, const FaceBitSet*, const AffineXf3f* ) const>( &Mesh::projectPoint ), allow_raw_pointers() )
		.function( "projectPointWithProjectionResult", select_overload<bool ( const Vector3f&, MeshProjectionResult&, float, const FaceBitSet*, const AffineXf3f * ) const>( &Mesh::projectPoint ), allow_raw_pointers() )
		.function( "projectPoint", select_overload<MeshProjectionResult ( const Vector3f&, float, const FaceBitSet *, const AffineXf3f * ) const>( &Mesh::projectPoint ), allow_raw_pointers() )
		.function( "findClosestPointWithProjectionResult", select_overload<bool ( const Vector3f&, MeshProjectionResult&, float, const FaceBitSet*, const AffineXf3f * ) const>( &Mesh::findClosestPoint ), allow_raw_pointers() )
		.function( "findClosestPoint", select_overload<MeshProjectionResult ( const Vector3f&, float, const FaceBitSet *, const AffineXf3f * ) const>( &Mesh::findClosestPoint ), allow_raw_pointers() )

		// HACK
		// 
		// The copy constructor of the `AABBTree` class is private, 
		// while Emscripten needs to create a copy of the object when generating the binding
		// 
		.function( "getAABBTree", optional_override( [] ( const Mesh& mesh ) -> const AABBTree*
		{
			return &mesh.getAABBTree();
		} ), allow_raw_pointers() )
		.function( "getAABBTreeNotCreate", &Mesh::getAABBTreeNotCreate, allow_raw_pointers() )
		// HACK
		.function( "getAABBTreePoints", optional_override( [] ( const Mesh& mesh ) -> const AABBTreePoints*
		{
			return &mesh.getAABBTreePoints();
		} ), allow_raw_pointers() )
		.function( "getAABBTreePointsNotCreate", &Mesh::getAABBTreePointsNotCreate, allow_raw_pointers() )
		.function( "getDipolesNotCreate", &Mesh::getDipolesNotCreate, allow_raw_pointers() )
		.function( "invalidateCaches", &Mesh::invalidateCaches )
		.function( "updateCaches", &Mesh::updateCaches )
		.function( "heapBytes", &Mesh::heapBytes )
		.function( "shrinkToFit", &Mesh::shrinkToFit )
		.function( "mirror", &Mesh::mirror )
		.function( "signedDistance", select_overload<float( const Vector3f& ) const>( &Mesh::signedDistance ) );


	///
	function( "createMaxillaGypsumBaseImpl", &MRJS::createMaxillaGypsumBaseImpl );
	function( "createMaxillaGypsumBaseImplTest", &MRJS::createMaxillaGypsumBaseImplTest );
	function( "createMandibleGypsumBaseImpl", &MRJS::createMandibleGypsumBaseImpl );
	///
}
