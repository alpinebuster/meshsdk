#include <optional>
#include <vector>
#include <type_traits>
#include <array>

#include <MRPch/MRWasm.h>
#include <MRPch/MRTBB.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshBuilderTypes.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRBitSetParallelFor.h>
#include <MRMesh/MRIdentifyVertices.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRVector4.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRRigidXf3.h>
#include <MRMesh/MRICP.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRMeshOrPoints.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRFillContour.h>
#include <MRMesh/MREdgeMetric.h>
#include <MRMesh/MRPointCloud.h>
#include <MRMesh/MRAABBTreePoints.h>
#include <MRMesh/MREdgePoint.h>
#include <MRMesh/MRDipole.h>
#include <MRMesh/MRGridSampling.h>
#include <MRMesh/MRMeshProject.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRMeshExtrude.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MROneMeshContours.h>
#include <MRMesh/MRIntersectionContour.h>
#include <MRMesh/MRMeshTriPoint.h>
#include <MRMesh/MRMeshFillHole.h>
#include <MRMesh/MRMeshNormals.h>
#include <MRMesh/MRParallelFor.h>
#include <MRMesh/MR2to3.h>
#include <MRMesh/MR2DContoursTriangulation.h>
#include <MRMesh/MRMeshCollidePrecise.h>
#include <MRMesh/MRConvexHull.h>
#include <MRMesh/MRFaceFace.h>
#include <MRMesh/MRMultiwayICP.h>

#include <MRVoxels/MRTeethMaskToDirectionVolume.h>
#include <MRVoxels/MRRebuildMesh.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;

namespace MRJS
{

std::function<bool( float )> createProgressCallback( val jsCallback )
{
	if ( jsCallback.isNull() || jsCallback.isUndefined() )
	{
		return {};
	}

	return [jsCallback] ( float progress ) -> bool
	{
		val result = jsCallback( progress );
		if ( result.isNull() || result.isUndefined() )
		{
			return true;
		}
		return result.as<bool>();
	};
}

Vector3f arrayToVector3f( const val& arr )
{
	return Vector3f( arr[0].as<float>(), arr[1].as<float>(), arr[2].as<float>() );
}

val vector3fToArray( const Vector3f& v )
{
	val arr = val::array();
	arr.set( 0, v.x );
	arr.set( 1, v.y );
	arr.set( 2, v.z );
	return arr;
}

val box3fToObject( const Box<Vector3<float>>& box )
{
	val obj = val::object();
	obj.set( "min", MRJS::vector3fToArray( box.min ) );
	obj.set( "max", MRJS::vector3fToArray( box.max ) );
	return obj;
}

template<typename T>
val expectedToJs( const Expected<T>& expected )
{
	if ( expected.has_value() )
	{
		val obj = val::object();
		obj.set( "success", true );
		obj.set( "value", expected.value() );
		return obj;
	}
	else
	{
		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", expected.error() );
		return obj;
	}
}

val verticesToFloat32ArrayMemoryView( const VertCoords& vec )
{
	return val( typed_memory_view( vec.size() * 3, reinterpret_cast<const float*>( vec.data() ) ) );
}

val indicesToUint32ArrayMemoryView( const Triangulation& vec )
{
	return val( typed_memory_view( vec.size() * 3, reinterpret_cast<const uint32_t*>( vec.data() ) ) );
}

VertCoords parseJSVertices( const std::vector<float>& coordinates )
{
    VertCoords verts;

    // Validate that we have complete sets of 3D coordinates
    if ( coordinates.size() % 3 != 0 )
    {
        throw std::invalid_argument( "Vertices array length must be divisible by 3" );
    }

    // Convert flat array to Vector3f objects
    verts.reserve( coordinates.size() / 3 );
    for ( size_t i = 0; i < coordinates.size(); i += 3 )
    {
        verts.emplace_back( coordinates[i], coordinates[i + 1], coordinates[i + 2] );
    }

    return verts;
}

Triangulation parseJSIndices( const std::vector<int>& indices )
{
    Triangulation indis_;

    if ( indices.size() % 3 != 0 )
    {
		throw std::invalid_argument( "Indices array length must be divisible by 3" );
    }

    indis_.reserve( indices.size() / 3 );
    for ( size_t i = 0; i < indices.size(); i += 3 )
    {
		ThreeVertIds tri {
			VertId( static_cast< int >( indices[i] ) ),
			VertId( static_cast< int >( indices[i + 1] ) ),
			VertId( static_cast< int >( indices[i + 2] ) )
		};
		indis_.emplace_back( tri );
    }

    return indis_;
}


val findBottomPosition( Mesh& mesh, Vector3f dir)
{
	if ( dir.length() != 1.0f ) dir = dir.normalized();

	auto holeEdges = mesh.topology.findHoleRepresentiveEdges();

    // Find hole with maximum area
	EdgeId maxAreaHole;
	double maxHoleAreaSq = 0.0;
    for ( const auto& e : holeEdges )
    {
        auto areaVec = mesh.holeDirArea( e );
        double areaSq = areaVec.lengthSq();
        if ( areaSq > maxHoleAreaSq )
        {
            maxHoleAreaSq = areaSq;
            maxAreaHole = e;
        }
    }


	///
    float min = FLT_MAX;
    VertId minVert;
    for ( auto next : leftRing( mesh.topology, maxAreaHole ) )
    {
        VertId vid = mesh.topology.org( next );
        float dist = dot( mesh.points[vid], dir );
        if ( dist < min )
        {
            min = dist;
            minVert = vid;
        }
    }
	///


	val data = val::object();

	data.set( "success", true );
	data.set( "minVert", minVert );
	data.set( "maxAreaHole", maxAreaHole );

	return data;
}


/**
 *@brief CutMesh with contour and extracting cutted parts
 * 
 *  using EdgePath = std::vector<EdgeId>;
 *  using EdgeLoop = std::vector<EdgeId>;
 *  using EdgeLoops = std::vector<EdgeLoop>;
 *
 * @param mesh 
 * @param cut 
 * @return std::pair<Mesh, Mesh> 
 */
std::pair<Mesh, Mesh> returnParts( Mesh& mesh, const std::vector<EdgePath>& cut )
{
	Mesh innerMesh;
    auto innerBitSet = fillContourLeft( mesh.topology, cut );
    innerMesh.addMeshPart( {mesh, &innerBitSet} );

    Mesh outerMesh;
    auto cutReverse = cut;
    MR::reverse( cutReverse );
    auto outerBitSet = fillContourLeft( mesh.topology, cutReverse  );
	outerMesh.addMeshPart( {mesh, &outerBitSet} );
	
	return { innerMesh, outerMesh };
}
std::pair<Mesh, Mesh> returnParts( Mesh& mesh, FaceBitSet& fb )
{
	auto otherPart = mesh.topology.getValidFaces() - fb;
	const auto fbArea = mesh.area( fb );
	const auto otherArea = mesh.area( otherPart );

	const FaceBitSet& smallerPart = fbArea < otherArea ? fb : otherPart;
	const FaceBitSet& largerPart = fbArea < otherArea ? otherPart : fb;

	return {
		mesh.cloneRegion( smallerPart ),
		mesh.cloneRegion( largerPart )
	};
}

MeshBuilder::VertexIdentifier createVertexIdentifier( const float* verticesPtr, const uint32_t* indicesPtr, int numTris ) 
{
	// NOTE: `template <typename T> using Triangle3 = std::array<Vector3<T>, 3>;`
	std::vector<Triangle3f> chunk;
	MeshBuilder::VertexIdentifier vi;
	chunk.resize( numTris );
	vi.reserve( numTris );
	ParallelFor( 0, numTris, [&]( int i ) {
		int fId = i * 3;
		VertId id1 = static_cast<VertId>( indicesPtr[fId] );
		VertId id2 = static_cast<VertId>( indicesPtr[fId + 1] );
		VertId id3 = static_cast<VertId>( indicesPtr[fId + 2] );

		int vIdx1 = static_cast<int>( id1 ) * 3;
		int vIdx2 = static_cast<int>( id2 ) * 3;
		int vIdx3 = static_cast<int>( id3 ) * 3;

		chunk[i][0] = { verticesPtr[vIdx1], verticesPtr[vIdx1 + 1], verticesPtr[vIdx1 + 2] };
		chunk[i][1] = { verticesPtr[vIdx2], verticesPtr[vIdx2 + 1], verticesPtr[vIdx2 + 2] };
		chunk[i][2] = { verticesPtr[vIdx3], verticesPtr[vIdx3 + 1], verticesPtr[vIdx3 + 2] };
	} );

	vi.addTriangles( chunk );
	return vi;
}

FaceBitSet findLookingFaces( const Mesh& mesh, const AffineXf3f& meshToWorld, Vector3f lookDirection, bool orthographic )
{
    const auto normals = computePerFaceNormals( mesh );
    FaceBitSet faces;
    faces.resize( normals.size() );

    BitSetParallelFor( mesh.topology.getValidFaces(), [&]( FaceId f )
    {
        auto transformedNormal = meshToWorld.A * normals[f];
        if ( orthographic )
        {
            if ( ( dot( transformedNormal, lookDirection ) > 0.0f ) )
                faces.set( f );
        }
        else
        {
            if ( dot( transformedNormal, lookDirection - mesh.triCenter( f ) ) > 0.0f )
                faces.set( f );
        }
    } );
    return faces;
}

Mesh findLookingSilhouetteConvexHull( const Mesh& meshRes, Vector3f lookDirection )
{
    // Find faces that looks in this direction
    FaceBitSet facesLookingInThisDirection( meshRes.topology.faceSize() );
    BitSetParallelFor( meshRes.topology.getValidFaces(), [&] ( FaceId f )
    {
        if ( MR::dot( meshRes.normal( f ), lookDirection ) > 0.0f )
            facesLookingInThisDirection.set( f );
    } );

    // Find boundaries of direction looking faces
    auto boundaries = findRightBoundary( meshRes.topology, facesLookingInThisDirection );

    // Project boundaries to 2d plane
    auto [x, y] = lookDirection.perpendicular();
    auto fromPlaneRot = Matrix3f::fromColumns( x, y, lookDirection );
    auto toPlaneRot = fromPlaneRot.inverse();

    Contours2f contours( boundaries.size() );
    ParallelFor( contours, [&] ( size_t i )
    {
        const auto& bound = boundaries[i];
        auto& cont = contours[i];
        cont.resize( bound.size() + 1 );
        MR::ParallelFor( bound, [&] ( size_t j )
        {
            cont[j] = MR::to2dim( toPlaneRot * meshRes.orgPnt( bound[j] ) );
        } );
        cont.back() = cont.front(); // close loops
    } );

    // Find silhouette outline
    Contours2f outlines = PlanarTriangulation::getOutline( contours );

    // Compute convex hull for each outline
    Contours2f chOutlines;
    chOutlines.reserve( outlines.size() );
    for ( const auto& outline : outlines )
    {
        chOutlines.push_back( makeConvexHull( outline ) );
    }

    // Triangulate outline
    auto projectedMesh = PlanarTriangulation::triangulateContours( chOutlines );

    // Project silhouette mesh back to original plane
    projectedMesh.transform( MR::AffineXf3f::linear( fromPlaneRot ) );

	return projectedMesh;
}


std::shared_ptr<GeometryBuffer> exportGeometryBuffer( const Mesh& meshToExport )
{
    return GeometryBuffer::fromMesh(meshToExport);
}

val exportMeshMemoryView( const Mesh& meshToExport )
{
	///
    // === Export point data ===
    const auto& points_ = meshToExport.points;
    size_t pointCount = points_.size();
    size_t vertexElementCount = pointCount * 3;
    const float* pointDataPtr = reinterpret_cast<const float*>( points_.data() );

    // NOTE: Can NOT use `val pointsArray = val( typed_memory_view( vertexElementCount, pointDataPtr ) );` directly,
	// because it will corrupt the data
	val pointsArray = val::global( "Float32Array" ).new_( vertexElementCount );
	pointsArray.call<void>( "set", val( typed_memory_view( vertexElementCount, pointDataPtr ) ) );
	///


	///
    // === Export triangle data ===
    // NOTE: The `tris_` returned by `getTriangulation()` is a temporary variable,
	// and directly using it in `typed_memory_view` will lead to incorrect indices data
    // While the vertices returned by `meshToExport.points` will live long enough to be called by JS side
    const Triangulation tris_ = meshToExport.topology.getTriangulation();
    size_t triangleCount = tris_.size();
    size_t triElementCount = triangleCount * 3;
    const uint32_t* triDataPtr = reinterpret_cast<const uint32_t*>( tris_.data() );

    // NOTE:
    // 
    //  uint32_t*   	-> Uint32Array, we need `Uint32Array` for threejs
    //  int*	        -> Int32Array
    // 
    val triangleArray = val::global( "Uint32Array" ).new_( triElementCount );
	triangleArray.call<void>( "set", val( typed_memory_view( triElementCount, triDataPtr ) ) );
	///

    val meshData = val::object();
    meshData.set( "vertices", pointsArray );
    meshData.set( "indices", triangleArray );

    return meshData;
};
val exportMeshMemoryViewTest( const Mesh& meshToExport ) {
    // === Export point data ===
    const auto& points_ = meshToExport.points;
    size_t pointCount = points_.size();
    size_t vertexElementCount = pointCount * 3;
    const float* pointDataPtr = reinterpret_cast<const float*>( points_.data() );

	/// WORKING
	// 
	// NOTE: `val::array` + loop set: 1) non-contiguous, dynamic; 2) N cross-language operations
    // val pointsArray = val::array();
    // // Pre-allocate the array length to improve performance
    // pointsArray.set( "length", vertexElementCount );
    // // Batch setting values - faster than pushing them one by one
    // for (size_t i = 0; i < vertexElementCount; ++i) {
    //     pointsArray.set( i, val( pointDataPtr[i] ) );
    // }
	//
	// NOTE: `typed_memory_view` + `TypedArray.set`: 1) compact, contiguous; 2) 1 cross-language operation
    val pointsArray = val::global( "Float32Array" ).new_( vertexElementCount );
	pointsArray.call<void>( "set", val( typed_memory_view( vertexElementCount, pointDataPtr ) ) );
	///


    // === Export triangle data ===
    const auto& tris_ = meshToExport.topology.getTriangulation();
    size_t triangleCount = tris_.size();
    size_t indexElementCount = triangleCount * 3;
    const uint32_t* triDataPtr = reinterpret_cast<const uint32_t*>( tris_.data() );

	/// WORKING
	// val triangleArray = val::array();
    // triangleArray.set( "length", indexElementCount );
	// for ( size_t i = 0; i < indexElementCount; ++i ) {
	// 	triangleArray.set( i, val(triDataPtr[i]) );
	// }
	//
    val triangleArray = val::global( "Uint32Array" ).new_( indexElementCount );
	triangleArray.call<void>( "set", val( typed_memory_view( indexElementCount, triDataPtr ) ) );
	///


    val meshData = val::object();
    meshData.set( "vertices", pointsArray );
    meshData.set( "indices", triangleArray );

    return meshData;
};

}


EMSCRIPTEN_BINDINGS( UtilsModule )
{
	class_<MRJS::GeometryBuffer>( "GeometryBuffer" )
        .smart_ptr<std::shared_ptr<MRJS::GeometryBuffer>>(" GeometryBuffer ")
        .constructor<val, val>()
		.property( "vertices", &MRJS::GeometryBuffer::vertices )
		.property( "indices", &MRJS::GeometryBuffer::indices );

	function( "exportGeometryBuffer", &MRJS::exportGeometryBuffer );
	function( "exportMeshMemoryView", &MRJS::exportMeshMemoryView );
	function( "exportMeshMemoryViewTest", &MRJS::exportMeshMemoryViewTest );

	function( "findLookingFaces", &MRJS::findLookingFaces );
	function( "findLookingSilhouetteConvexHull", &MRJS::findLookingSilhouetteConvexHull );
	function( "findBottomPosition", &MRJS::findBottomPosition );
}


// ------------------------------------------------------------------------
// Bindings for `std::pair<*, *>`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( PairTypedModule )
{
    ///
    value_array<std::pair<std::vector<int>, int>>( "VectorStdIntIntPair" )
        .element( &std::pair<std::vector<int>, int>::first )
        .element( &std::pair<std::vector<int>, int>::second );

    value_array<std::pair<std::vector<float>, int>>( "VectorStdFloatIntPair" )
        .element( &std::pair<std::vector<float>, int>::first )
        .element( &std::pair<std::vector<float>, int>::second );

    value_array<std::pair<std::vector<float>, float>>( "VectorStdFloatFloatPair" )
        .element( &std::pair<std::vector<float>, float>::first )
        .element( &std::pair<std::vector<float>, float>::second );
	///


    ///
    value_array<std::pair<EdgeId, bool>>( "EdgeIdBoolPair" )
        .element( &std::pair<EdgeId, bool>::first )
        .element( &std::pair<EdgeId, bool>::second );

    value_array<std::pair<UndirectedEdgeId, bool>>( "UndirectedEdgeIdBoolPair" )
        .element( &std::pair<UndirectedEdgeId, bool>::first )
        .element( &std::pair<UndirectedEdgeId, bool>::second );

    value_array<std::pair<FaceId, bool>>( "FaceIdBoolPair" )
        .element( &std::pair<FaceId, bool>::first )
        .element( &std::pair<FaceId, bool>::second );

    value_array<std::pair<VertId, bool>>( "VertIdBoolPair" )
        .element( &std::pair<VertId, bool>::first )
        .element( &std::pair<VertId, bool>::second );

    value_array<std::pair<PixelId, bool>>( "PixelIdBoolPair" )
        .element( &std::pair<PixelId, bool>::first )
        .element( &std::pair<PixelId, bool>::second );

    value_array<std::pair<VoxelId, bool>>( "VoxelIdBoolPair" )
        .element( &std::pair<VoxelId, bool>::first )
        .element( &std::pair<VoxelId, bool>::second );

    value_array<std::pair<RegionId, bool>>( "RegionIdBoolPair" )
        .element( &std::pair<RegionId, bool>::first )
        .element( &std::pair<RegionId, bool>::second );

    value_array<std::pair<NodeId, bool>>( "NodeIdBoolPair" )
        .element( &std::pair<NodeId, bool>::first )
        .element( &std::pair<NodeId, bool>::second );

    value_array<std::pair<ObjId, bool>>( "ObjIdBoolPair" )
        .element( &std::pair<ObjId, bool>::first )
        .element( &std::pair<ObjId, bool>::second );

    value_array<std::pair<TextureId, bool>>( "TextureIdBoolPair" )
        .element( &std::pair<TextureId, bool>::first )
        .element( &std::pair<TextureId, bool>::second );

    value_array<std::pair<GraphVertId, bool>>( "GraphVertIdBoolPair" )
        .element( &std::pair<GraphVertId, bool>::first )
        .element( &std::pair<GraphVertId, bool>::second );

    value_array<std::pair<GraphEdgeId, bool>>( "GraphEdgeIdBoolPair" )
        .element( &std::pair<GraphEdgeId, bool>::first )
        .element( &std::pair<GraphEdgeId, bool>::second );
    ///


    ///
    // NOTE: This is identical to `EdgePair`
    value_array<std::pair<EdgeId, EdgeId>>( "EdgeIdPair" )
        .element( &std::pair<EdgeId, EdgeId>::first )
        .element( &std::pair<EdgeId, EdgeId>::second );

    value_array<std::pair<VertId, VertId>>( "VertIdPair" )
        .element( &std::pair<VertId, VertId>::first )
        .element( &std::pair<VertId, VertId>::second );

    value_array<std::pair<FaceId, FaceId>>( "FaceIdPair" )
        .element( &std::pair<FaceId, FaceId>::first )
        .element( &std::pair<FaceId, FaceId>::second );

    value_array<std::pair<UndirectedEdgeId, UndirectedEdgeId>>( "UndirectedEdgeIdPair" )
        .element( &std::pair<UndirectedEdgeId, UndirectedEdgeId>::first )
        .element( &std::pair<UndirectedEdgeId, UndirectedEdgeId>::second );

    value_array<std::pair<UndirectedEdgeId, EdgeId>>( "UndirectedE2EIdPair" )
        .element( &std::pair<UndirectedEdgeId, EdgeId>::first )
        .element( &std::pair<UndirectedEdgeId, EdgeId>::second );
    ///


	///
    value_array<std::pair<Vector4b, Vector4b>>( "Vector4bPair" )
        .element( &std::pair<Vector4b, Vector4b>::first )
        .element( &std::pair<Vector4b, Vector4b>::second );

    value_array<std::pair<Vector4f, Vector4f>>( "Vector4fPair" )
        .element( &std::pair<Vector4f, Vector4f>::first )
        .element( &std::pair<Vector4f, Vector4f>::second );

    value_array<std::pair<Vector4i, Vector4i>>( "Vector4iPair" )
        .element( &std::pair<Vector4i, Vector4i>::first )
        .element( &std::pair<Vector4i, Vector4i>::second );

    value_array<std::pair<Vector4i64, Vector4i64>>( "Vector4i64Pair" )
        .element( &std::pair<Vector4i64, Vector4i64>::first )
        .element( &std::pair<Vector4i64, Vector4i64>::second );

    value_array<std::pair<Vector4d, Vector4d>>( "Vector4dPair" )
        .element( &std::pair<Vector4d, Vector4d>::first )
        .element( &std::pair<Vector4d, Vector4d>::second );
	///
	
	
	///
    value_array<std::pair<Vector3f, Vector3f>>( "Vector3fPair" )
        .element( &std::pair<Vector3f, Vector3f>::first )
        .element( &std::pair<Vector3f, Vector3f>::second );

    value_array<std::pair<Vector3b, Vector3b>>( "Vector3bPair" )
        .element( &std::pair<Vector3b, Vector3b>::first )
        .element( &std::pair<Vector3b, Vector3b>::second );

    value_array<std::pair<Vector3i, Vector3i>>( "Vector3iPair" )
        .element( &std::pair<Vector3i, Vector3i>::first )
        .element( &std::pair<Vector3i, Vector3i>::second );

    value_array<std::pair<Vector3i64, Vector3i64>>( "Vector3i64Pair" )
        .element( &std::pair<Vector3i64, Vector3i64>::first )
        .element( &std::pair<Vector3i64, Vector3i64>::second );

    value_array<std::pair<Vector3d, Vector3d>>( "Vector3dPair" )
        .element( &std::pair<Vector3d, Vector3d>::first )
        .element( &std::pair<Vector3d, Vector3d>::second );
	///


	///
    value_array<std::pair<Vector2i, Vector2i>>( "Vector2iPair" )
        .element( &std::pair<Vector2i, Vector2i>::first )
        .element( &std::pair<Vector2i, Vector2i>::second );

    value_array<std::pair<Vector2f, Vector2f>>( "Vector2fPair" )
        .element( &std::pair<Vector2f, Vector2f>::first )
        .element( &std::pair<Vector2f, Vector2f>::second );

    value_array<std::pair<Vector2i64, Vector2i64>>( "Vector2i64Pair" )
        .element( &std::pair<Vector2i64, Vector2i64>::first )
        .element( &std::pair<Vector2i64, Vector2i64>::second );

    value_array<std::pair<Vector2b, Vector2b>>( "Vector2bPair" )
        .element( &std::pair<Vector2b, Vector2b>::first )
        .element( &std::pair<Vector2b, Vector2b>::second );

    value_array<std::pair<Vector2d, Vector2d>>( "Vector2dPair" )
        .element( &std::pair<Vector2d, Vector2d>::first )
        .element( &std::pair<Vector2d, Vector2d>::second );
	///


	///
    value_array<std::pair<Mesh, Mesh>>( "MeshPair" )
        .element( &std::pair<Mesh, Mesh>::first )
        .element( &std::pair<Mesh, Mesh>::second );
	///


	///
    value_array<std::pair<Face2RegionMap, int>>( "Face2RegionMapIntPair" )
        .element( &std::pair<Face2RegionMap, int>::first )
        .element( &std::pair<Face2RegionMap, int>::second );

    value_array<std::pair<std::vector<Face2RegionMap>, int>>( "VectorFace2RegionMapIntPair" )
        .element( &std::pair<std::vector<Face2RegionMap>, int>::first )
        .element( &std::pair<std::vector<Face2RegionMap>, int>::second );
	///


	///
    value_array<std::pair<FaceBitSet, FaceBitSet>>( "FaceBitSetFaceBitSetPair" )
        .element( &std::pair<FaceBitSet, FaceBitSet>::first )
        .element( &std::pair<FaceBitSet, FaceBitSet>::second );

    value_array<std::pair<VertBitSet, VertBitSet>>( "VertBitSetVertBitSetPair" )
        .element( &std::pair<VertBitSet, VertBitSet>::first )
        .element( &std::pair<VertBitSet, VertBitSet>::second );

    value_array<std::pair<EdgeBitSet, EdgeBitSet>>( "EdgeBitSetEdgeBitSetPair" )
        .element( &std::pair<EdgeBitSet, EdgeBitSet>::first )
        .element( &std::pair<EdgeBitSet, EdgeBitSet>::second );

    value_array<std::pair<UndirectedEdgeBitSet, UndirectedEdgeBitSet>>( "UndirectedEdgeBitSetUndirectedEdgeBitSetPair" )
        .element( &std::pair<UndirectedEdgeBitSet, UndirectedEdgeBitSet>::first )
        .element( &std::pair<UndirectedEdgeBitSet, UndirectedEdgeBitSet>::second );

    value_array<std::pair<PixelBitSet, PixelBitSet>>( "PixelBitSetPixelBitSetPair" )
        .element( &std::pair<PixelBitSet, PixelBitSet>::first )
        .element( &std::pair<PixelBitSet, PixelBitSet>::second );

    value_array<std::pair<VoxelBitSet, VoxelBitSet>>( "VoxelBitSetVoxelBitSetPair" )
        .element( &std::pair<VoxelBitSet, VoxelBitSet>::first )
        .element( &std::pair<VoxelBitSet, VoxelBitSet>::second );

    value_array<std::pair<RegionBitSet, RegionBitSet>>( "RegionBitSetRegionBitSetPair" )
        .element( &std::pair<RegionBitSet, RegionBitSet>::first )
        .element( &std::pair<RegionBitSet, RegionBitSet>::second );

    value_array<std::pair<NodeBitSet, NodeBitSet>>( "NodeBitSetNodeBitSetPair" )
        .element( &std::pair<NodeBitSet, NodeBitSet>::first )
        .element( &std::pair<NodeBitSet, NodeBitSet>::second );

    value_array<std::pair<ObjBitSet, ObjBitSet>>( "ObjBitSetObjBitSetPair" )
        .element( &std::pair<ObjBitSet, ObjBitSet>::first )
        .element( &std::pair<ObjBitSet, ObjBitSet>::second );

    value_array<std::pair<TextureBitSet, TextureBitSet>>( "TextureBitSetTextureBitSetPair" )
        .element( &std::pair<TextureBitSet, TextureBitSet>::first )
        .element( &std::pair<TextureBitSet, TextureBitSet>::second );

    value_array<std::pair<GraphVertBitSet, GraphVertBitSet>>( "GraphVertBitSetGraphVertBitSetPair" )
        .element( &std::pair<GraphVertBitSet, GraphVertBitSet>::first )
        .element( &std::pair<GraphVertBitSet, GraphVertBitSet>::second );

    value_array<std::pair<GraphEdgeBitSet, GraphEdgeBitSet>>( "GraphEdgeBitSetGraphEdgeBitSetPair" )
        .element( &std::pair<GraphEdgeBitSet, GraphEdgeBitSet>::first )
        .element( &std::pair<GraphEdgeBitSet, GraphEdgeBitSet>::second );
	///


	///
    value_array<std::pair<FaceBitSet, int>>( "FaceBitSetIntPair" )
        .element( &std::pair<FaceBitSet, int>::first )
        .element( &std::pair<FaceBitSet, int>::second );

    value_array<std::pair<VertBitSet, int>>( "VertBitSetIntPair" )
        .element( &std::pair<VertBitSet, int>::first )
        .element( &std::pair<VertBitSet, int>::second );

    value_array<std::pair<EdgeBitSet, int>>( "EdgeBitSetIntPair" )
        .element( &std::pair<EdgeBitSet, int>::first )
        .element( &std::pair<EdgeBitSet, int>::second );

    value_array<std::pair<UndirectedEdgeBitSet, int>>( "UndirectedEdgeBitSetIntPair" )
        .element( &std::pair<UndirectedEdgeBitSet, int>::first )
        .element( &std::pair<UndirectedEdgeBitSet, int>::second );

    value_array<std::pair<PixelBitSet, int>>( "PixelBitSetIntPair" )
        .element( &std::pair<PixelBitSet, int>::first )
        .element( &std::pair<PixelBitSet, int>::second );

    value_array<std::pair<VoxelBitSet, int>>( "VoxelBitSetIntPair" )
        .element( &std::pair<VoxelBitSet, int>::first )
        .element( &std::pair<VoxelBitSet, int>::second );

    value_array<std::pair<RegionBitSet, int>>( "RegionBitSetIntPair" )
        .element( &std::pair<RegionBitSet, int>::first )
        .element( &std::pair<RegionBitSet, int>::second );

    value_array<std::pair<NodeBitSet, int>>( "NodeBitSetIntPair" )
        .element( &std::pair<NodeBitSet, int>::first )
        .element( &std::pair<NodeBitSet, int>::second );

    value_array<std::pair<ObjBitSet, int>>( "ObjBitSetIntPair" )
        .element( &std::pair<ObjBitSet, int>::first )
        .element( &std::pair<ObjBitSet, int>::second );

    value_array<std::pair<TextureBitSet, int>>( "TextureBitSetIntPair" )
        .element( &std::pair<TextureBitSet, int>::first )
        .element( &std::pair<TextureBitSet, int>::second );

    value_array<std::pair<GraphVertBitSet, int>>( "GraphVertBitSetIntPair" )
        .element( &std::pair<GraphVertBitSet, int>::first )
        .element( &std::pair<GraphVertBitSet, int>::second );

    value_array<std::pair<GraphEdgeBitSet, int>>( "GraphEdgeBitSetIntPair" )
        .element( &std::pair<GraphEdgeBitSet, int>::first )
        .element( &std::pair<GraphEdgeBitSet, int>::second );
	///


	///
    value_array<std::pair<std::vector<FaceBitSet>, int>>( "VectorFaceBitSetIntPair" )
        .element( &std::pair<std::vector<FaceBitSet>, int>::first )
        .element( &std::pair<std::vector<FaceBitSet>, int>::second );

    value_array<std::pair<std::vector<VertBitSet>, int>>( "VectorVertBitSetIntPair" )
        .element( &std::pair<std::vector<VertBitSet>, int>::first )
        .element( &std::pair<std::vector<VertBitSet>, int>::second );

    value_array<std::pair<std::vector<EdgeBitSet>, int>>( "VectorEdgeBitSetIntPair" )
        .element( &std::pair<std::vector<EdgeBitSet>, int>::first )
        .element( &std::pair<std::vector<EdgeBitSet>, int>::second );

    value_array<std::pair<std::vector<UndirectedEdgeBitSet>, int>>( "VectorUndirectedEdgeBitSetIntPair" )
        .element( &std::pair<std::vector<UndirectedEdgeBitSet>, int>::first )
        .element( &std::pair<std::vector<UndirectedEdgeBitSet>, int>::second );

    value_array<std::pair<std::vector<PixelBitSet>, int>>( "VectorPixelBitSetIntPair" )
        .element( &std::pair<std::vector<PixelBitSet>, int>::first )
        .element( &std::pair<std::vector<PixelBitSet>, int>::second );

    value_array<std::pair<std::vector<VoxelBitSet>, int>>( "VectorVoxelBitSetIntPair" )
        .element( &std::pair<std::vector<VoxelBitSet>, int>::first )
        .element( &std::pair<std::vector<VoxelBitSet>, int>::second );

    value_array<std::pair<std::vector<RegionBitSet>, int>>( "VectorRegionBitSetIntPair" )
        .element( &std::pair<std::vector<RegionBitSet>, int>::first )
        .element( &std::pair<std::vector<RegionBitSet>, int>::second );

    value_array<std::pair<std::vector<NodeBitSet>, int>>( "VectorNodeBitSetIntPair" )
        .element( &std::pair<std::vector<NodeBitSet>, int>::first )
        .element( &std::pair<std::vector<NodeBitSet>, int>::second );

    value_array<std::pair<std::vector<ObjBitSet>, int>>( "VectorObjBitSetIntPair" )
        .element( &std::pair<std::vector<ObjBitSet>, int>::first )
        .element( &std::pair<std::vector<ObjBitSet>, int>::second );

    value_array<std::pair<std::vector<TextureBitSet>, int>>( "VectorTextureBitSetIntPair" )
        .element( &std::pair<std::vector<TextureBitSet>, int>::first )
        .element( &std::pair<std::vector<TextureBitSet>, int>::second );

    value_array<std::pair<std::vector<GraphVertBitSet>, int>>( "VectorGraphVertBitSetIntPair" )
        .element( &std::pair<std::vector<GraphVertBitSet>, int>::first )
        .element( &std::pair<std::vector<GraphVertBitSet>, int>::second );

    value_array<std::pair<std::vector<GraphEdgeBitSet>, int>>( "VectorGraphEdgeBitSetIntPair" )
        .element( &std::pair<std::vector<GraphEdgeBitSet>, int>::first )
        .element( &std::pair<std::vector<GraphEdgeBitSet>, int>::second );
	///
}


// ------------------------------------------------------------------------
// Bind the Embind interface for `std::vector<*>`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( VectorTypedModule )
{
	///
	// NOTE:
	//
	// int          4 bytes    Ordinary count, index
	// float        4 bytes    Requires decimals, but prioritizes memory and speed
	// long long    8 bytes    Very large integers
	// double       8 bytes    High precision decimals, commonly used in scientific calculations
	//
	register_vector<int>( "StdVectori" );
	register_vector<float>( "StdVectorf" );
	register_vector<double>( "StdVectord" );
	register_vector<long long>( "StdVectorll" );
	///


	///
	register_vector<std::vector<int>>( "VectorStdVectori" );
	register_vector<std::vector<float>>( "VectorStdVectorf" );
	register_vector<std::vector<double>>( "VectorStdVectord" );
	register_vector<std::vector<long long>>( "VectorStdVectorll" );

	register_vector<std::array<int, 3>>( "VectorArray3StdVectori" );
	register_vector<std::array<float, 3>>( "VectorArray3StdVectorf" );
	register_vector<std::array<double, 3>>( "VectorArray3StdVectord" );
	register_vector<std::array<long long, 3>>( "VectorArray3StdVectorll" );
	///


	///
    register_vector<Vector<int, size_t>>( "VectorVectorStdi" );
    register_vector<Vector<float, size_t>>( "VectorVectorStdd" );
	register_vector<Vector<double, size_t>>( "VectorVectorStdf" );
	register_vector<Vector<long long, size_t>>( "VectorVectorStdll" );
	///


	///
    register_vector<const Mesh*>( "VectorConstMeshPtr" );
    register_vector<const MeshTopology*>( "VectorConstMeshTopologyPtr" );
	///


	///
	register_vector<MeshBuilder::MeshPiece>( "VectorMeshPiece" );
	register_vector<EdgePoint>( "SurfacePath" );

	register_vector<AABBTreePoints::Point>( "VectorAABBTreePointsPoint" );
    register_vector<AABBTreePoints::Node>( "VectorAABBTreePointsNode" );

    register_vector<ModelPointsData>( "VectorModelPointsData" );
    register_vector<ObjVertId>( "VectorObjVertId" );

    register_vector<MeshProjectionResult>( "VectorMeshProjectionResult" );
	register_vector<MeshBuilder::VertDuplication>( "VectorVertDuplication" );

    register_vector<EdgeTri>( "VectorEdgeTri" );
	// ContinuousContour is `std::vector<VarEdgeTri>`
    register_vector<VarEdgeTri>( "ContinuousContour" );
    // `ContinuousContours` is `std::vector<ContinuousContour>`
	register_vector<ContinuousContour>( "ContinuousContours" );
    register_vector<OneMeshContour>( "OneMeshContours" );
    register_vector<OneMeshIntersection>( "VectorOneMeshIntersection" );
	register_vector<MeshTriPoint>( "VectorMeshTriPoint" );
	
	register_vector<FillHoleItem>( "VectorFillHoleItem" );
	register_vector<HoleFillPlan>( "VectorHoleFillPlan" );

	register_vector<FaceFace>( "VectorFaceFace" );
	register_vector<PointPair>( "VectorPointPair" );
    register_vector<RigidXf3d>( "VectorRigidXf3d" );
    register_vector<RigidXf3f>( "VectorRigidXf3f" );
	///


	///
	register_vector<std::vector<MeshBuilder::MeshPiece>>( "VectorVectorMeshPiece" );
	register_vector<std::vector<EdgePoint>>( "SurfacePaths" );

	register_vector<std::vector<AABBTreePoints::Point>>( "VectorVectorAABBTreePointsPoint" );
    register_vector<std::vector<AABBTreePoints::Node>>( "VectorVectorAABBTreePointsNode" );

    register_vector<std::vector<ModelPointsData>>( "VectorVectorModelPointsData" );
    register_vector<std::vector<ObjVertId>>( "VectorVectorObjVertId" );

    register_vector<std::vector<MeshProjectionResult>>( "VectorVectorMeshProjectionResult" );
	register_vector<std::vector<MeshBuilder::VertDuplication>>( "VectorVectorVertDuplication" );

    register_vector<std::vector<EdgeTri>>( "VectorVectorEdgeTri" );
    // NOTE: `std::vector<std::vector<VarEdgeTri>>` is `std::vector<ContinuousContour>`;
	register_vector<std::vector<ContinuousContour>>( "VectorContinuousContours" );
    register_vector<std::vector<OneMeshContour>>( "VectorOneMeshContours" );
    register_vector<std::vector<OneMeshIntersection>>( "VectorVectorOneMeshIntersection" );
    register_vector<std::vector<MeshTriPoint>>( "VectorVectorMeshTriPoint" );

	register_vector<std::vector<FaceFace>>( "VectorVectorFaceFace" );

	register_vector<Box3f>( "VectorBox3f" );
	register_vector<Box3i>( "VectorBox3i" );
	register_vector<Box3i64>( "VectorBox3i64" );
	register_vector<Box3d>( "VectorBox3d" );

	register_vector<ICPGroupPair>( "VectorICPGroupPair" );
	///


	///
    register_vector<std::array<Vector2i, 2>>( "VectorArray2Vector2i" );
    register_vector<std::array<Vector2f, 2>>( "VectorArray2Vector2f" );
	register_vector<std::array<Vector2d, 2>>( "VectorArray2Vector2d" );

	register_vector<std::array<Vector2i, 3>>( "VectorArray3Vector2i" );
    register_vector<std::array<Vector2f, 3>>( "VectorArray3Vector2f" );
	register_vector<std::array<Vector2d, 3>>( "VectorArray3Vector2d" );

	
	register_vector<std::array<Vector3i, 2>>( "VectorArray2Triangle3i" );
    register_vector<std::array<Vector3f, 2>>( "VectorArray2Triangle3f" );
	register_vector<std::array<Vector3d, 2>>( "VectorArray2Triangle3d" );

	register_vector<std::array<Vector3i, 3>>( "VectorArray3Triangle3i" );
    register_vector<std::array<Vector3f, 3>>( "VectorArray3Triangle3f" );
    register_vector<std::array<Vector3d, 3>>( "VectorArray3Triangle3d" );
	///

    ///
    // Register vector structures of `*Id()`
    register_vector<EdgeId>( "VectorEdgeId" );
    register_vector<UndirectedEdgeId>( "VectorUndirectedEdgeId" );
    register_vector<FaceId>( "VectorFaceId" );
    register_vector<VertId>( "VectorVertId" );
    register_vector<PixelId>( "VectorPixelId" );
    register_vector<VoxelId>( "VectorVoxelId" );
    register_vector<RegionId>( "VectorRegionId" );
    register_vector<NodeId>( "VectorNodeId" );
    register_vector<ObjId>( "VectorObjId" );
    register_vector<TextureId>( "VectorTextureId" );
    register_vector<GraphVertId>( "VectorGraphVertId" );
    register_vector<GraphEdgeId>( "VectorGraphEdgeId" );

    // NOTE: `EdgeLoop` equals `EdgePath` 
    // register_vector<EdgeLoop>( "VectorEdgeLoop" );
    register_vector<EdgePath>( "VectorEdgePath" );
    // NOTE: `EdgeLoops` equals `std::vector<EdgePath>`
    // register_vector<EdgeLoops>( "VectorEdgeLoops" );
    register_vector<std::vector<EdgePath>>( "VectorVectorEdgePath" );

	register_vector<std::vector<std::vector<EdgePoint>>>( "VectorSurfacePaths" );
	///


	///
	// Register vector structures of `std::vector<*Id()>`
	// 
	// NOTE:
	//   `EdgePath` -> `std::vector<EdgeId>`
	//   `EdgeLoop` -> `std::vector<EdgeId>`
	// 
	// register_vector<std::vector<EdgeId>>( "VectorVectorEdgeId" );
	// 
    register_vector<std::vector<UndirectedEdgeId>>( "VectorVectorUndirectedEdgeId" );
    register_vector<std::vector<FaceId>>( "VectorVectorFaceId" );
    register_vector<std::vector<VertId>>( "VectorVectorVertId" );
    register_vector<std::vector<PixelId>>( "VectorVectorPixelId" );
    register_vector<std::vector<VoxelId>>( "VectorVectorVoxelId" );
    register_vector<std::vector<RegionId>>( "VectorVectorRegionId" );
    register_vector<std::vector<NodeId>>( "VectorVectorNodeId" );
    register_vector<std::vector<ObjId>>( "VectorVectorObjId" );
    register_vector<std::vector<TextureId>>( "VectorVectorTextureId" );
    register_vector<std::vector<GraphVertId>>( "VectorVectorGraphVertId" );
    register_vector<std::vector<GraphEdgeId>>( "VectorVectorGraphEdgeId" );
	///


	///
	register_vector<FaceBitSet>( "VectorFaceBitSet" );
	register_vector<VertBitSet>( "VectorVertBitSet" );
	register_vector<EdgeBitSet>( "VectorEdgeBitSet" );
	register_vector<UndirectedEdgeBitSet>( "VectorUndirectedEdgeBitSet" );
	register_vector<PixelBitSet>( "VectorPixelBitSet" );
	register_vector<VoxelBitSet>( "VectorVoxelBitSet" );
	register_vector<RegionBitSet>( "VectorRegionBitSet" );
	register_vector<NodeBitSet>( "VectorNodeBitSet" );
	register_vector<ObjBitSet>( "VectorObjBitSet" );
	register_vector<TextureBitSet>( "VectorTextureBitSet" );
	register_vector<GraphVertBitSet>( "VectorGraphVertBitSet" );
	register_vector<GraphEdgeBitSet>( "VectorGraphEdgeBitSet" );
	///


	///
    // Register vector structures of `VectorArray*Id()`
    register_vector<std::array<EdgeId, 2>>( "VectorArray2EdgeId" );
    register_vector<std::array<UndirectedEdgeId, 2>>( "VectorArray2UndirectedEdgeId" );
    register_vector<std::array<FaceId, 2>>( "VectorArray2FaceId" );
    register_vector<std::array<VertId, 2>>( "VectorArray2VertId" );
    register_vector<std::array<PixelId, 2>>( "VectorArray2PixelId" );
    register_vector<std::array<VoxelId, 2>>( "VectorArray2VoxelId" );
    register_vector<std::array<RegionId, 2>>( "VectorArray2RegionId" );
    register_vector<std::array<NodeId, 2>>( "VectorArray2NodeId" );
    register_vector<std::array<ObjId, 2>>( "VectorArray2ObjId" );
    register_vector<std::array<TextureId, 2>>( "VectorArray2TextureId" );
    register_vector<std::array<GraphVertId, 2>>( "VectorArray2GraphVertId" );
    register_vector<std::array<GraphEdgeId, 2>>( "VectorArray2GraphEdgeId" );


    register_vector<std::array<EdgeId, 3>>( "VectorArray3EdgeId" );
    register_vector<std::array<UndirectedEdgeId, 3>>( "VectorArray3UndirectedEdgeId" );
    register_vector<std::array<FaceId, 3>>( "VectorArray3FaceId" );

	// NOTE: `ThreeVertIds` is `std::array<VertId, 3>`
    // register_vector<ThreeVertIds>( "VectorThreeVertIds" );
    register_vector<std::array<VertId, 3>>( "VectorArray3VertId" );

    register_vector<std::array<PixelId, 3>>( "VectorArray3PixelId" );
    register_vector<std::array<VoxelId, 3>>( "VectorArray3VoxelId" );
    register_vector<std::array<RegionId, 3>>( "VectorArray3RegionId" );
    register_vector<std::array<NodeId, 3>>( "VectorArray3NodeId" );
    register_vector<std::array<ObjId, 3>>( "VectorArray3ObjId" );
    register_vector<std::array<TextureId, 3>>( "VectorArray3TextureId" );
    register_vector<std::array<GraphVertId, 3>>( "VectorArray3GraphVertId" );
    register_vector<std::array<GraphEdgeId, 3>>( "VectorArray3GraphEdgeId" );


    register_vector<std::array<EdgeId, 4>>( "VectorArray4EdgeId" );
    register_vector<std::array<UndirectedEdgeId, 4>>( "VectorArray4UndirectedEdgeId" );
    register_vector<std::array<FaceId, 4>>( "VectorArray4FaceId" );
    register_vector<std::array<VertId, 4>>( "VectorArray4VertId" );
    register_vector<std::array<PixelId, 4>>( "VectorArray4PixelId" );
    register_vector<std::array<VoxelId, 4>>( "VectorArray4VoxelId" );
    register_vector<std::array<RegionId, 4>>( "VectorArray4RegionId" );
    register_vector<std::array<NodeId, 4>>( "VectorArray4NodeId" );
    register_vector<std::array<ObjId, 4>>( "VectorArray4ObjId" );
    register_vector<std::array<TextureId, 4>>( "VectorArray4TextureId" );
    register_vector<std::array<GraphVertId, 4>>( "VectorArray4GraphVertId" );
    register_vector<std::array<GraphEdgeId, 4>>( "VectorArray4GraphEdgeId" );
	///

	
	///
    register_vector<std::pair<EdgeId, EdgeId>>( "EdgeHashMapEntries" );
    register_vector<std::pair<UndirectedEdgeId, UndirectedEdgeId>>( "UndirectedEdgeHashMapEntries" );
    register_vector<std::pair<UndirectedEdgeId, EdgeId>>( "WholeEdgeHashMapEntries" );
    register_vector<std::pair<FaceId, FaceId>>( "FaceHashMapEntries" );
    register_vector<std::pair<VertId, VertId>>( "VertHashMapEntries" );
	///


	///
	register_vector<Vector<MeshBuilder::VertSpan, FaceId>>( "VectorVertSpanFaceIdMap" );
	register_vector<Vector<VertId, EdgeId>>( "VectorVertIdEdgeIdMap" );
	register_vector<Vector<EdgeId, VertId>>( "VectorEdgeIdVertIdMap" );
	register_vector<Vector<EdgeId, FaceId>>( "VectorEdgeIdFaceIdMap" );
	register_vector<Vector<FaceId, EdgeId>>( "VectorFaceIdEdgeIdMap" );
	register_vector<Vector<ModelPointsData, ObjId>>( "VectorModelPointsDataObjIdMap" );
	register_vector<WholeEdgeMap>( "VectorWholeEdgeMap" );
	register_vector<UndirectedEdge2RegionMap>( "VectorUndirectedEdge2RegionMap" );
	register_vector<Face2RegionMap>( "VectorFace2RegionMap" );
	register_vector<Vert2RegionMap>( "VectorVert2RegionMap" );
	register_vector<Vector<VoxelId, FaceId>>( "VectorVoxelIdFaceId" );
	///


	///
	register_vector<Vector2f>( "VectorVector2f" );
	register_vector<std::vector<Vector2f>>( "VectorVectorVector2f" );
	
	register_vector<Vector2i64>( "VectorVector2i64" );
	register_vector<std::vector<Vector2i64>>( "VectorVectorVector2i64" );
	
	register_vector<Vector2b>( "VectorVector2b" );
	register_vector<std::vector<Vector2b>>( "VectorVectorVector2b" );
	
	register_vector<Vector2i>( "VectorVector2i" );
	register_vector<std::vector<Vector2i>>( "VectorVectorVector2i" );

	register_vector<Vector2d>( "VectorVector2d" );
	register_vector<std::vector<Vector2d>>( "VectorVectorVector2d" );
	///


	///
	register_vector<Vector3f>( "VectorVector3f" );
	register_vector<std::vector<Vector3f>>( "VectorVectorVector3f" );

	register_vector<Vector3b>( "VectorVector3b" );
	register_vector<std::vector<Vector3b>>( "VectorVectorVector3b" );

	register_vector<Vector3i>( "VectorVector3i" );
	register_vector<std::vector<Vector3i>>( "VectorVectorVector3i" );

	register_vector<Vector3i64>( "VectorVector3i64" );
	register_vector<std::vector<Vector3i64>>( "VectorVectorVector3i64" );

	register_vector<Vector3d>( "VectorVector3d" );
	register_vector<std::vector<Vector3d>>( "VectorVectorVector3d" );
	///


	///
    register_vector<Vector4f>( "VectorVector4f" );
	register_vector<std::vector<Vector4f>>( "VectorVectorVector4f" );

	register_vector<Vector4b>( "VectorVector4b" );
	register_vector<std::vector<Vector4b>>( "VectorVectorVector4b" );
	
	register_vector<Vector4i>( "VectorVector4i" );
	register_vector<std::vector<Vector4i>>( "VectorVectorVector4i" );
	
	register_vector<Vector4i64>( "VectorVector4i64" );
	register_vector<std::vector<Vector4i64>>( "VectorVectorVector4i64" );
	
	register_vector<Vector4d>( "VectorVector4d" );
	register_vector<std::vector<Vector4d>>( "VectorVectorVector4d" );
	///
}


// ------------------------------------------------------------------------
// Bind the Embind interface for `Array*`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( ArrayTypedModule )
{
	/// Bind the Embind interface for `Array2Std*`
	MRJS::bindStdArray<int, 2>( "Array2Stdi" );
	MRJS::bindStdArray<float, 2>( "Array2Stdf" );
	MRJS::bindStdArray<long long, 2>( "Array2Stdll" );
	MRJS::bindStdArray<double, 2>( "Array2Stdd" );

	MRJS::bindStdArray<int, 3>( "Array3Stdi" );
	MRJS::bindStdArray<float, 3>( "Array3Stdf" );
	MRJS::bindStdArray<long long, 3>( "Array3Stdll" );
	MRJS::bindStdArray<double, 3>( "Array3Stdd" );

	MRJS::bindStdArray<int, 4>( "Array4Stdi" );
	MRJS::bindStdArray<float, 4>( "Array4Stdf" );
	MRJS::bindStdArray<long long, 4>( "Array4Stdll" );
	MRJS::bindStdArray<double, 4>( "Array4Stdd" );
	///


	///
	MRJS::bindStdArray<WeightedVertex, 2>( "Array2WeightedVertex" );
	MRJS::bindStdArray<WeightedVertex, 3>( "Array3WeightedVertex" );
	MRJS::bindStdArray<WeightedVertex, 4>( "Array4WeightedVertex" );
	///


	///
	MRJS::bindStdArray<Vector2b, 2>( "Array2Vector2b" );
	MRJS::bindStdArray<Vector2i, 2>( "Array2Vector2i" );
	MRJS::bindStdArray<Vector2i64, 2>( "Array2Vector2i64" );
	MRJS::bindStdArray<Vector2f, 2>( "Array2Vector2f" );
	MRJS::bindStdArray<Vector2d, 2>( "Array2Vector2d" );

	MRJS::bindStdArray<Vector2b, 3>( "Array3Vector2b" );
	MRJS::bindStdArray<Vector2i, 3>( "Array3Vector2i" );
	MRJS::bindStdArray<Vector2i64, 3>( "Array3Vector2i64" );
	MRJS::bindStdArray<Vector2f, 3>( "Array3Vector2f" );
	MRJS::bindStdArray<Vector2d, 3>( "Array3Vector2d" );


	MRJS::bindStdArray<Vector3b, 2>( "Array2Triangle3b" );
	MRJS::bindStdArray<Vector3i, 2>( "Array2Triangle3i" );
	MRJS::bindStdArray<Vector3i64, 2>( "Array2Triangle3i64" );
	MRJS::bindStdArray<Vector3f, 2>( "Array2Triangle3f" );
	MRJS::bindStdArray<Vector3d, 2>( "Array2Triangle3d" );

	MRJS::bindStdArray<Vector3b, 3>( "Array3Triangle3b" );
	MRJS::bindStdArray<Vector3i, 3>( "Array3Triangle3i" );
	MRJS::bindStdArray<Vector3i64, 3>( "Array3Triangle3i64" );
	MRJS::bindStdArray<Vector3f, 3>( "Array3Triangle3f" );
	MRJS::bindStdArray<Vector3d, 3>( "Array3Triangle3d" );
	///


	/// 
	// Bind the Embind interface for `Array*Id`
	MRJS::bindStdArray<EdgeId, 2>( "Array2EdgeId" );
	MRJS::bindStdArray<EdgeId, 3>( "Array3EdgeId" );
	MRJS::bindStdArray<EdgeId, 4>( "Array4EdgeId" );

	MRJS::bindStdArray<UndirectedEdgeId, 2>( "Array2UndirectedEdgeId" );
	MRJS::bindStdArray<UndirectedEdgeId, 3>( "Array3UndirectedEdgeId" );
	MRJS::bindStdArray<UndirectedEdgeId, 4>( "Array4UndirectedEdgeId" );

	MRJS::bindStdArray<FaceId, 2>( "Array2FaceId" );
	MRJS::bindStdArray<FaceId, 3>( "Array3FaceId" );
	MRJS::bindStdArray<FaceId, 4>( "Array4FaceId" );

	MRJS::bindStdArray<VertId, 2>( "Array2VertId" );
	MRJS::bindStdArray<VertId, 3>( "Array3VertId" );
	MRJS::bindStdArray<VertId, 4>( "Array4VertId" );
	
	MRJS::bindStdArray<ThreeVertIds, 2>( "Array2ThreeVertIds" );
	MRJS::bindStdArray<ThreeVertIds, 3>( "Array3ThreeVertIds" );
	MRJS::bindStdArray<ThreeVertIds, 4>( "Array4ThreeVertIds" );

	MRJS::bindStdArray<PixelId, 2>( "Array2PixelId" );
	MRJS::bindStdArray<PixelId, 3>( "Array3PixelId" );
	MRJS::bindStdArray<PixelId, 4>( "Array4PixelId" );

	MRJS::bindStdArray<VoxelId, 2>( "Array2VoxelId" );
	MRJS::bindStdArray<VoxelId, 3>( "Array3VoxelId" );
	MRJS::bindStdArray<VoxelId, 4>( "Array4VoxelId" );

	MRJS::bindStdArray<RegionId, 2>( "Array2RegionId" );
	MRJS::bindStdArray<RegionId, 3>( "Array3RegionId" );
	MRJS::bindStdArray<RegionId, 4>( "Array4RegionId" );

	MRJS::bindStdArray<NodeId, 2>( "Array2NodeId" );
	MRJS::bindStdArray<NodeId, 3>( "Array3NodeId" );
	MRJS::bindStdArray<NodeId, 4>( "Array4NodeId" );

	MRJS::bindStdArray<ObjId, 2>( "Array2ObjId" );
	MRJS::bindStdArray<ObjId, 3>( "Array3ObjId" );
	MRJS::bindStdArray<ObjId, 4>( "Array4ObjId" );

	MRJS::bindStdArray<TextureId, 2>( "Array2TextureId" );
	MRJS::bindStdArray<TextureId, 3>( "Array3TextureId" );
	MRJS::bindStdArray<TextureId, 4>( "Array4TextureId" );

	MRJS::bindStdArray<GraphVertId, 2>( "Array2GraphVertId" );
	MRJS::bindStdArray<GraphVertId, 3>( "Array3GraphVertId" );
	MRJS::bindStdArray<GraphVertId, 4>( "Array4GraphVertId" );

	MRJS::bindStdArray<GraphEdgeId, 2>( "Array2GraphEdgeId" );
	MRJS::bindStdArray<GraphEdgeId, 3>( "Array3GraphEdgeId" );
	MRJS::bindStdArray<GraphEdgeId, 4>( "Array4GraphEdgeId" );
	///
}


// ------------------------------------------------------------------------
// Bind the Embind interface for `Optional*`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( OptionalTypedModule )
{
	///
	register_optional<int>();
	register_optional<float>();
	register_optional<long long>();
	register_optional<double>();
	///


	///
    register_optional<Vector<int, size_t>>();
    register_optional<Vector<float, size_t>>();
	register_optional<Vector<long long, size_t>>();
	register_optional<Vector<double, size_t>>();
	///

	///
	register_optional<MeshOrPoints>();
    register_optional<ModelPointsData>();
    register_optional<MultiObjsSamples>();
    register_optional<DentalId>();
	///


	///
	register_optional<Triangulation>();
	register_optional<Dipoles>();
	register_optional<FaceMap>();
	register_optional<VertMap>();
	register_optional<EdgeMap>();
	register_optional<UndirectedEdgeMap>();
	register_optional<ObjMap>();

	register_optional<PackMapping>();
	///


	///
	register_optional<Vector3b>();
	register_optional<Vector3i>();
	register_optional<Vector3i64>();
	register_optional<Vector3f>();
	register_optional<Vector3d>();
	///


	///
	register_optional<std::array<Vector3b, 2>>();
	register_optional<std::array<Vector3i, 2>>();
	register_optional<std::array<Vector3i64, 2>>();
	register_optional<std::array<Vector3f, 2>>();
	register_optional<std::array<Vector3d, 2>>();

	register_optional<std::array<Vector3b, 3>>();
	register_optional<std::array<Vector3i, 3>>();
	register_optional<std::array<Vector3i64, 3>>();
	register_optional<std::array<Vector3f, 3>>();
	register_optional<std::array<Vector3d, 3>>();


	register_optional<std::array<Vector2b, 2>>();
	register_optional<std::array<Vector2i, 2>>();
	register_optional<std::array<Vector2i64, 2>>();
	register_optional<std::array<Vector2f, 2>>();
	register_optional<std::array<Vector2d, 2>>();

	register_optional<std::array<Vector2b, 3>>();
	register_optional<std::array<Vector2i, 3>>();
	register_optional<std::array<Vector2i64, 3>>();
	register_optional<std::array<Vector2f, 3>>();
	register_optional<std::array<Vector2d, 3>>();
	///


	///
	register_optional<FaceBitSet>();
	register_optional<VertBitSet>();
	register_optional<EdgeBitSet>();
	register_optional<UndirectedEdgeBitSet>();
	register_optional<PixelBitSet>();
	register_optional<VoxelBitSet>();
	register_optional<RegionBitSet>();
	register_optional<NodeBitSet>();
	register_optional<ObjBitSet>();
	register_optional<TextureBitSet>();
	register_optional<GraphVertBitSet>();
	register_optional<GraphEdgeBitSet>();
	///


	///
	register_optional<VertPair>();
	register_optional<FacePair>();
	register_optional<EdgePair>();
	register_optional<UndirectedEdgePair>();
	///


	///
	register_optional<Vector<VoxelId, FaceId>>();
	///


	///
	register_optional<std::vector<VertPair>>();
	register_optional<std::vector<FacePair>>();
	register_optional<std::vector<EdgePair>>();
	register_optional<std::vector<UndirectedEdgePair>>();
	///


	///
	register_optional<EdgeId>();
	register_optional<UndirectedEdgeId>();
	register_optional<FaceId>();
	register_optional<VertId>();
	register_optional<PixelId>();
	register_optional<VoxelId>();
	register_optional<RegionId>();
	register_optional<NodeId>();
	register_optional<ObjId>();
	register_optional<TextureId>();
	register_optional<GraphVertId>();
	register_optional<GraphEdgeId>();
	///


	///
	register_optional<std::vector<EdgeId>>();
	register_optional<std::vector<UndirectedEdgeId>>();
	register_optional<std::vector<FaceId>>();
	register_optional<std::vector<VertId>>();
	register_optional<std::vector<PixelId>>();
	register_optional<std::vector<VoxelId>>();
	register_optional<std::vector<RegionId>>();
	register_optional<std::vector<NodeId>>();
	register_optional<std::vector<ObjId>>();
	register_optional<std::vector<TextureId>>();
	register_optional<std::vector<GraphVertId>>();
	register_optional<std::vector<GraphEdgeId>>();
	///
}


// ------------------------------------------------------------------------
// Bind the Embind interface for `*Functor*`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( FunctorTypedModule )
{
	///
	class_<std::function<std::string( std::string )>>( "StringFunctorString" )
		.constructor<>()
		.function( "opcall", &std::function<std::string( std::string )>::operator() );

	class_<std::function<float( int )>>( "FloatFunctorInt" )
		.constructor<>()
		.function( "opcall", &std::function<float( int )>::operator() );
	///


	///
	class_<std::function<bool( float )>>( "ProgressCallback" )
		.constructor<>()
		.function( "opcall", &std::function<bool( float )>::operator() );
	///


	///
	class_<std::function<void( int )>>( "VoidFunctorInt" )
		.constructor<>()
		.function( "opcall", &std::function<void( int )>::operator() );

	class_<std::function<void( EdgeId, EdgeId )>>( "VoidFunctorEdgeIdEdgeId" )
		.constructor<>()
		.function( "opcall", &std::function<void( EdgeId, EdgeId )>::operator() );

	class_<std::function<void( const Vector3f&, MeshOrPoints::ProjectionResult&, ObjId& )>>( "VoidFunctorVector3fProjectionResultObjId" )
		.constructor<>()
		.function( "opcall", &std::function<void( const Vector3f&, MeshOrPoints::ProjectionResult&, ObjId& )>::operator() );

	class_<std::function<void( SignDetectionMode )>>( "VoidFunctorSignDetectionMode" )
		.constructor<>()
		.function( "opcall", &std::function<void( SignDetectionMode )>::operator() );
	///


	///
	class_<std::function<bool( VertId )>>( "VertPredicate" )
		.constructor<>()
		.function( "opcall", &std::function<bool( VertId )>::operator() );

	class_<std::function<bool( FaceId )>>( "FacePredicate" )
		.constructor<>()
		.function( "opcall", &std::function<bool( FaceId )>::operator() );

	class_<std::function<bool( EdgeId )>>( "EdgePredicate" )
		.constructor<>()
		.function( "opcall", &std::function<bool( EdgeId )>::operator() );

	class_<std::function<bool( UndirectedEdgeId )>>( "UndirectedEdgePredicate" )
		.constructor<>()
		.function( "opcall", &std::function<bool( UndirectedEdgeId )>::operator() );
	///


	///
	class_<std::function<float( VertId )>>( "VertMetric" )
		.constructor<>()
		.function( "opcall", &std::function<float( VertId )>::operator() );

	class_<std::function<float( FaceId )>>( "FaceMetric" )
		.constructor<>()
		.function( "opcall", &std::function<float( FaceId )>::operator() );

	class_<std::function<float( EdgeId )>>( "EdgeMetric" )
		.constructor<>()
		.function( "opcall", &std::function<float( EdgeId )>::operator() );

	class_<std::function<float( UndirectedEdgeId )>>( "UndirectedEdgeMetric" )
		.constructor<>()
		.function( "opcall", &std::function<float( UndirectedEdgeId )>::operator() );
	///


	///
	class_<std::function<float( Triangulation )>>( "FloatFunctorTriangulation" )
		.constructor<>()
		.function( "opcall", &std::function<float( Triangulation )>::operator() );
	
	class_<std::function<float( Dipoles )>>( "FloatFunctorDipoles" )
		.constructor<>()
		.function( "opcall", &std::function<float( Dipoles )>::operator() );
	class_<std::function<float( FaceMap )>>( "FloatFunctorFaceMap" )
		.constructor<>()
		.function( "opcall", &std::function<float( FaceMap )>::operator() );
	
	class_<std::function<float( VertMap )>>( "FloatFunctorVertMap" )
		.constructor<>()
		.function( "opcall", &std::function<float( VertMap )>::operator() );
	
	class_<std::function<float( EdgeMap )>>( "FloatFunctorEdgeMap" )
		.constructor<>()
		.function( "opcall", &std::function<float( EdgeMap )>::operator() );
	
	class_<std::function<float( UndirectedEdgeMap )>>( "FloatFunctorUndirectedEdgeMap" )
		.constructor<>()
		.function( "opcall", &std::function<float( UndirectedEdgeMap )>::operator() );
	
	class_<std::function<float( ObjMap )>>( "FloatFunctorObjMap" )
		.constructor<>()
		.function( "opcall", &std::function<float( ObjMap )>::operator() );
	///


	///
	class_<std::function<float( FaceBitSet )>>( "FloatFunctorFaceBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( FaceBitSet )>::operator() );
	
	class_<std::function<float( VertBitSet )>>( "FloatFunctorVertBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( VertBitSet )>::operator() );
	
	class_<std::function<float( EdgeBitSet )>>( "FloatFunctorEdgeBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( EdgeBitSet )>::operator() );
	
	class_<std::function<float( UndirectedEdgeBitSet )>>( "FloatFunctorUndirectedEdgeBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( UndirectedEdgeBitSet )>::operator() );
	
	class_<std::function<float( PixelBitSet )>>( "FloatFunctorPixelBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( PixelBitSet )>::operator() );
	
	class_<std::function<float( VoxelBitSet )>>( "FloatFunctorVoxelBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( VoxelBitSet )>::operator() );
	
	class_<std::function<float( RegionBitSet )>>( "FloatFunctorRegionBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( RegionBitSet )>::operator() );
	
	class_<std::function<float( NodeBitSet )>>( "FloatFunctorNodeBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( NodeBitSet )>::operator() );
	
	class_<std::function<float( ObjBitSet )>>( "FloatFunctorObjBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( ObjBitSet )>::operator() );
	
	class_<std::function<float( TextureBitSet )>>( "FloatFunctorTextureBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( TextureBitSet )>::operator() );
	
	class_<std::function<float( GraphVertBitSet )>>( "FloatFunctorGraphVertBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( GraphVertBitSet )>::operator() );
	
	class_<std::function<float( GraphEdgeBitSet )>>( "FloatFunctorGraphEdgeBitSet" )
		.constructor<>()
		.function( "opcall", &std::function<float( GraphEdgeBitSet )>::operator() );
	///


	///
	class_<std::function<Expected<SurfacePath>( const MeshTriPoint&, const MeshTriPoint&, int, int )>>( "ExpectedSurfacePathFunctorMeshTriPoint" )
		.constructor<>()
		.function( "opcall", &std::function<Expected<SurfacePath>( const MeshTriPoint&, const MeshTriPoint&, int, int )>::operator() );
	///


	///
	class_<std::function<Vector3f ( const Vector3f & )>>( "Vector3fFunctorVector3f" )
		.constructor<>()
		.function( "opcall", &std::function<Vector3f ( const Vector3f & )>::operator() );
	///
}
