#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MREdgeMetric.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRSurroundingContour.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRFillContourByGraphCut.h>

#include "MRUtils.h"
#include "MRFillContourByGraphCut.h"

using namespace emscripten;
using namespace MR;

namespace MRJS {

val segmentByPointsImpl( Mesh& mesh_, EdgeMetric& edgeMetric_, const std::vector<float>& coordinates, const std::vector<float>& dir )
{
	val result = val::object();

	// Input validation
	if ( mesh_.points.empty() )
	{
		result.set( "success", false );
		result.set( "error", std::string( "Mesh not initialized" ) );

		return result;
	}

	try
	{
		VertCoords inputPoints = MRJS::parseJSVertices( coordinates );

		if ( inputPoints.size() != 2 && inputPoints.size() != 4 )
		{
			result.set( "success", false );
			std::string err = "Need exactly 2 or 4 input points, got " + std::to_string(inputPoints.size());
			result.set("error", err);

			return result;
		}

		// Step 1: Find closest vertices on the mesh for each input point using `findProjection()`
		std::vector<VertId> keyVertices;
		keyVertices.reserve( inputPoints.size() );

		MeshPart m = MeshPart( mesh_ );

		mesh_.getAABBTree();
		for ( const Vector3f& point : inputPoints )
		{
			MeshProjectionResult closestVert = findProjection( point, m );
			if ( !closestVert.valid() )
			{
				result.set( "success", false );
				result.set( "error", std::string( "Could not find valid vertex for input point" ) );

				return result;
			}
			keyVertices.push_back( mesh_.getClosestVertex( closestVert.proj ) );
		}

		// Step 2: Use the direction provided by JavaScript
		Vector3f contourDirection( dir[0], dir[1], dir[2] );

		// Normalize the direction vector to ensure it's a unit vector
		float dirLength = contourDirection.length();
		if ( dirLength < 1e-6f )
		{
			result.set( "success", false );
			result.set( "error", std::string( "Direction vector is too small or zero" ) );

			return result;
		}
		contourDirection /= dirLength;

		///
		// Use Gram-Schmidt-like orthogonalization to infer direction:
		// 1. cross(pointsDir, meshDir) to obtain a vector perpendicular to both directions.
		// 2. Then cross it with pointsDir to get a vector that lies in the plane of meshDir and is orthogonal to pointsDir.
		// 3. Then determine if it is in the same direction or the opposite direction as meshDir.
		Vector3f meshDir = Vector3f{ mesh_.dirArea() };
		Vector3f pointsDir = mesh_.points[keyVertices[0]] - mesh_.points[keyVertices[1]];

		Vector3f guessDir = cross( cross( pointsDir, meshDir ), pointsDir );

		// Direction Correction
		if ( dot( guessDir, meshDir ) < 0 ) guessDir = -guessDir;

		Vector3f direction = guessDir.normalized();
		///

		// Step 3: Create surrounding contour
		auto contourResult = surroundingContour( mesh_, keyVertices, edgeMetric_, direction /*contourDirection*/ );
		if ( !contourResult )
		{
			result.set( "success", false );
			result.set( "error", std::string( "Failed to create surrounding contour: " ) + contourResult.error() );

			return result;
		}
		EdgeLoop contour = contourResult.value();

		// Step 4: Convert EdgeLoop to EdgePath for `fillContourLeftByGraphCut()`
		EdgePath contourPath( contour.begin(), contour.end() );

		// Step 5: Fill the contour to get the segmented region
		FaceBitSet segmentedFaces = fillContourLeftByGraphCut( mesh_.topology, contourPath, edgeMetric_ );

		// Mesh segMesh;
		// segMesh.addMeshPart( {mesh_, &segmentedFaces} );
		auto [smallerMesh, largerMesh] = MRJS::returnParts( mesh_, segmentedFaces );
		val smallerMeshData = MRJS::exportMeshMemoryView( smallerMesh );
		val largerMeshData = MRJS::exportMeshMemoryView( largerMesh );


		// Build the result object
		result.set( "success", true );
		result.set( "smallerMesh", smallerMesh );
		result.set( "largerMesh", largerMesh );
		result.set( "smallerMeshMV", smallerMeshData );
		result.set( "largerMeshMV", largerMeshData );
	}
	catch ( const std::exception& e )
	{
		result.set( "success", false );
		result.set( "error", std::string( "Exception during segmentation: " ) + e.what() );
	}

	return result;
}

} // namespace MRJS


EMSCRIPTEN_BINDINGS( FillContourByGraphCutModule )
{
	///
	function( "fillContourLeftByGraphCut", select_overload<FaceBitSet (const MeshTopology &, const EdgePath &, const EdgeMetric &, const ProgressCallback&)>( &fillContourLeftByGraphCut ) );
	function( "fillContourLeftByGraphCutByContours", select_overload<FaceBitSet (const MeshTopology &, const std::vector<EdgePath> &, const EdgeMetric &, const ProgressCallback&)>( &fillContourLeftByGraphCut ) );
	function( "segmentByGraphCut", &segmentByGraphCut );
	///


	function( "segmentByPointsImpl", &MRJS::segmentByPointsImpl );
}
