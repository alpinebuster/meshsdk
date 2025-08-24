#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRTriMesh.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRSharpenMarchingCubesMesh.h>
#include <MRMesh/MRVolumeIndexer.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshFixer.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRMeshFillHole.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRPositionVertsSmoothly.h>
#include <MRMesh/MRConvexHull.h>
#include <MRMesh/MRMeshMetrics.h>

#include <MRVoxels/MRCalcDims.h>
#include <MRVoxels/MRFloatGrid.h>
#include <MRVoxels/MRVDBConversions.h>
#include <MRVoxels/MRMarchingCubes.h>
#include <MRVoxels/MRMeshToDistanceVolume.h>
#include <MRVoxels/MROffset.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;

namespace MRJS {

FaceBitSet stitchHolesWithCylinders( Mesh& mesh, const std::vector<std::vector<EdgeId>>& holes, const FillHoleMetric fillHoleMetric )
{
    FaceBitSet newFaces;
    if ( holes.empty() ) return newFaces;

    // Calculate the perimeter and center of each hole
    std::vector<float> holesLength( holes.size() );
    std::vector<Vector3f> holeCenters( holes.size() );

    for ( size_t i = 0; i < holes.size(); ++i )
    {
        float length = 0.0f;
        Vector3f center( 0.0f, 0.0f, 0.0f );
        for ( EdgeId e : holes[i] )
        {
            auto org = mesh.topology.org( e );
            auto dest = mesh.topology.dest( e );
            length += ( mesh.points[dest] - mesh.points[org] ).length();
            center += mesh.points[org];
        }
        holesLength[i] = length;
        holeCenters[i] = center / float( holes[i].size() );
    }

	// Find largest two holes
    int maxLengthI = 0, maxLengthI2 = -1;
    float maxLength = -1.0f;
    for ( int i = 0; i < holesLength.size(); ++i )
    {
        if ( holesLength[i] > maxLength )
        {
            maxLength = holesLength[i];
            maxLengthI = i;
        }
    }

    maxLength = -1.0f;
    for ( int i = 0; i < holesLength.size(); ++i )
    {
        if ( i != maxLengthI && holesLength[i] > maxLength )
        {
            maxLength = holesLength[i];
            maxLengthI2 = i;
        }
    }

	// Build hole pairs
    std::vector<std::array<int, 2>> holePairs;
    if ( maxLengthI2 != -1 ) holePairs.push_back( { maxLengthI, maxLengthI2 } );

	// Find nearest pairs for remaining holes
    std::vector<int> minDistancesI( holes.size(), -1 );
    for ( int i = 0; i < holes.size(); ++i )
    {
        if ( i == maxLengthI || i == maxLengthI2 )
            continue;

        float minDist = std::numeric_limits<float>::max();
        int minJ = -1;

        for ( int j = 0; j < holes.size(); ++j )
        {
            if ( j == i || j == maxLengthI || j == maxLengthI2 )
                continue;

            float dist = ( holeCenters[i] - holeCenters[j] ).length();
            if ( dist < minDist )
            {
                minDist = dist;
                minJ = j;
            }
        }
        minDistancesI[i] = minJ;
    }

    for ( int i = 0; i < holes.size() / 2; ++i )
    {
        if ( minDistancesI[i] != -1 )
            holePairs.push_back( { i, minDistancesI[i] } );
    }


	// Stitch holes with cylinders
    StitchHolesParams stitchParams;
    // stitchParams.metric = getEdgeLengthStitchMetric( mesh );
    // stitchParams.metric = getMinAreaMetric( mesh );
	stitchParams.metric = fillHoleMetric;
    stitchParams.outNewFaces = &newFaces;

    for ( const auto& pair : holePairs )
    {
        if ( pair[0] < holes.size() && pair[1] < holes.size() )
        {
            if ( !holes[pair[0]].empty() && !holes[pair[1]].empty() )
                buildCylinderBetweenTwoHoles( mesh, holes[pair[0]][0], holes[pair[1]][0], stitchParams );
        }
    }
	

	return newFaces;
}


val thickenMeshImpl( const Mesh& mesh, float offset, const GeneralOffsetParameters& params )
{
	auto result = thickenMesh( mesh, offset, params );

	if ( result )
	{
		auto mesh = result.value();
		val meshData = MRJS::exportMeshMemoryView( mesh );

		// Return the mesh wrapped in an object that indicates success
		val returnObj = val::object();
		returnObj.set( "success", true );
		returnObj.set( "mesh", mesh );
		returnObj.set( "meshMV", meshData );

		return returnObj;
	}
	else
	{
		// Return an error object with the error message
		val returnObj = val::object();
		returnObj.set( "success", false );
		returnObj.set( "error", result.error() );

		return returnObj;
	}
}

val thickenMeshFilledImpl( const Mesh& mesh, float offset, bool smooth, GeneralOffsetParameters &params )
{
	val returnObj = val::object();

	Mesh meshCopy;
	meshCopy.topology = mesh.topology;
	meshCopy.points = mesh.points;

	MeshBuilder::uniteCloseVertices( meshCopy, meshCopy.computeBoundingBox().diagonal() * 1e-6 );
	auto result = thickenMesh( meshCopy, offset, params );
	if ( result )
	{
		Mesh& shell = result.value();

		///
		// Find boundary holes
		auto holes = findRightBoundary( shell.topology );
		if ( holes.size() < 2 )
		{
			returnObj.set( "success", false );

			std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
			returnObj.set( "error: ", errorMessage );
			return returnObj;
		}
		auto fillHoleMetric = getMinAreaMetric( shell );
		auto newFaces = stitchHolesWithCylinders( shell, holes, fillHoleMetric );


		if (smooth) {
			// Subdivide new faces
			SubdivideSettings subdivSettings;
			subdivSettings.region = &newFaces;
			subdivSettings.maxEdgeSplits = INT_MAX;
			subdivSettings.maxEdgeLen = 1.0f;

			subdivideMesh( shell, subdivSettings );

			// Smooth vertices
			auto smoothVerts = getInnerVerts( shell.topology, newFaces );
			positionVertsSmoothly( shell, smoothVerts );
		}


		val meshData = MRJS::exportMeshMemoryView( shell );

		returnObj.set( "success", true );
		returnObj.set( "mesh", shell );
		returnObj.set( "meshMV", meshData );

		return returnObj;
	}
	else
	{
		// Return an error object with the error message
		val returnObj = val::object();
		returnObj.set( "success", false );
		returnObj.set( "error", result.error() );

		return returnObj;
	}
}

val thickenMeshWithTensionImpl( const Mesh& mesh, float offset, bool smooth, float tension, GeneralOffsetParameters &params )
{
	val returnObj = val::object();

	Mesh meshCopy;
	meshCopy.topology = mesh.topology;
	meshCopy.points = mesh.points;

	MeshBuilder::uniteCloseVertices( meshCopy, meshCopy.computeBoundingBox().diagonal() * 1e-6 );


	///
	MeshPart mp = MeshPart( meshCopy );
	auto mShell = offsetOneDirection( mp, tension, params );
	auto mShellMesh = mShell.value();
	///


	auto result = thickenMesh( mShellMesh, offset, params );
	if ( result )
	{
		Mesh& shell = result.value();

		///
		// Find boundary holes
		auto holes = findRightBoundary( shell.topology );
		if ( holes.size() < 2 )
		{
			returnObj.set( "success", false );

			std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
			returnObj.set( "error: ", errorMessage );
			return returnObj;
		}
		auto fillHoleMetric = getMinAreaMetric( shell );
		auto newFaces = stitchHolesWithCylinders( shell, holes, fillHoleMetric );


		if (smooth) {
			// Subdivide new faces
			SubdivideSettings subdivSettings;
			subdivSettings.region = &newFaces;
			subdivSettings.maxEdgeSplits = INT_MAX;
			subdivSettings.maxEdgeLen = 1.0f;

			subdivideMesh( shell, subdivSettings );

			// Smooth vertices
			auto smoothVerts = getInnerVerts( shell.topology, newFaces );
			positionVertsSmoothly( shell, smoothVerts );
		}


		val meshData = MRJS::exportMeshMemoryView( shell );

		returnObj.set( "success", true );
		returnObj.set( "mesh", shell );
		returnObj.set( "meshMV", meshData );

		return returnObj;
	}
	else
	{
		// Return an error object with the error message
		val returnObj = val::object();
		returnObj.set( "success", false );
		returnObj.set( "error", result.error() );

		return returnObj;
	}
}

val generateOrthodonticBiteImpl( Mesh& meshA, Mesh& meshB, float tension, const InflateSettings& inflateSettings, GeneralOffsetParameters &params )
{
	val returnObj = val::object();

	///
	// Handle tension
	Mesh curMeshA = (tension > 0) ? offsetOneDirection(MeshPart(meshA), tension, params).value() : meshA;
	curMeshA.topology.flipOrientation(); // only if tension > 0

	Mesh curMeshB = (tension > 0) ? offsetOneDirection(MeshPart(meshB), tension, params).value() : meshB;
	curMeshB.topology.flipOrientation(); // only if tension > 0

	// Connect two meshes
	curMeshA.addMeshPart( curMeshB );
	///
	

	auto holes = findRightBoundary( curMeshA.topology );
	if ( holes.size() < 2 )
	{
		returnObj.set( "success", false );

		std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
		returnObj.set( "error: ", errorMessage );

		return returnObj;
	}
	auto fillHoleMetric = getMinAreaMetric( curMeshA );
	auto newFaces = stitchHolesWithCylinders( curMeshA, holes, fillHoleMetric );


	/// inflate new faces
	if ( inflateSettings.pressure > 0 ) {
		// Find the newly generated internal vertices
		auto newVerts = getInnerVerts( curMeshA.topology, newFaces );
		inflate( curMeshA, newVerts, inflateSettings );
	}
	///


    val meshData = MRJS::exportMeshMemoryView( curMeshA );

    returnObj.set( "success", true );
    returnObj.set( "mesh", curMeshA );
    returnObj.set( "meshMV", meshData );

	return returnObj;
}

val generateOrthodonticBiteWithFillHoleMetricImpl( Mesh& meshA, Mesh& meshB, float tension, const InflateSettings& inflateSettings, GeneralOffsetParameters &params, const FillHoleMetric fillHoleMetric )
{
	val returnObj = val::object();


	///
	// Handle tension
	Mesh curMeshA = (tension > 0) ? offsetOneDirection(MeshPart(meshA), tension, params).value() : meshA;
	curMeshA.topology.flipOrientation(); // only if tension > 0

	Mesh curMeshB = (tension > 0) ? offsetOneDirection(MeshPart(meshB), tension, params).value() : meshB;
	curMeshB.topology.flipOrientation(); // only if tension > 0

	// Connect two meshes
	curMeshA.addMeshPart( curMeshB );
	///
	

	auto holes = findRightBoundary( curMeshA.topology );
	if ( holes.size() < 2 )
	{
		returnObj.set( "success", false );

		std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
		returnObj.set( "error: ", errorMessage );

		return returnObj;
	}
	auto newFaces = stitchHolesWithCylinders( curMeshA, holes, fillHoleMetric );


	/// inflate new faces
	// Find the newly generated internal vertices
	if ( inflateSettings.pressure > 0 ) {
		// Find the newly generated internal vertices
		auto newVerts = getInnerVerts( curMeshA.topology, newFaces );
		inflate( curMeshA, newVerts, inflateSettings );
	}
	///


    val meshData = MRJS::exportMeshMemoryView( curMeshA );

    returnObj.set( "success", true );
    returnObj.set( "mesh", curMeshA );
    returnObj.set( "meshMV", meshData );

	return returnObj;
}

}


EMSCRIPTEN_BINDINGS( OffsetModule )
{
	class_<BaseShellParameters>( "BaseShellParameters" )
		.constructor<>()
		.property( "voxelSize", &OffsetParameters::voxelSize )
		.property( "callBack", &OffsetParameters::callBack );
	

	class_<OffsetParameters, base<BaseShellParameters>>( "OffsetParameters" )
		.constructor<>()
		.property( "signDetectionMode", &OffsetParameters::signDetectionMode )
		.property( "closeHolesInHoleWindingNumber", &OffsetParameters::closeHolesInHoleWindingNumber )
		.property( "windingNumberThreshold", &OffsetParameters::windingNumberThreshold )
		.property( "windingNumberBeta", &OffsetParameters::windingNumberBeta )
		// TODO
		// .property( "fwn", &OffsetParameters::fwn )
		.property( "memoryEfficient", &OffsetParameters::memoryEfficient );


	class_<SharpOffsetParameters, base<OffsetParameters>>( "SharpOffsetParameters" )
		.constructor<>()
		.property( "outSharpEdges", &SharpOffsetParameters::outSharpEdges, allow_raw_pointers() )
		.property( "minNewVertDev", &SharpOffsetParameters::minNewVertDev )
		.property( "maxNewRank2VertDev", &SharpOffsetParameters::maxNewRank2VertDev )
		.property( "maxNewRank3VertDev", &SharpOffsetParameters::maxNewRank3VertDev )
		.property( "maxOldVertPosCorrection", &SharpOffsetParameters::maxOldVertPosCorrection );


	class_<GeneralOffsetParameters, base<SharpOffsetParameters>>( "GeneralOffsetParameters" )
		.constructor<>()
		.property( "mode", &GeneralOffsetParameters::mode );


	///
	function( "suggestVoxelSize", &suggestVoxelSize );
	function( "offsetMesh", &offsetMesh );
	function( "doubleOffsetMesh", &doubleOffsetMesh );
	function( "mcOffsetMesh", &mcOffsetMesh, allow_raw_pointers() );
	function( "mcShellMeshRegion", &mcShellMeshRegion, allow_raw_pointers() );
	function( "sharpOffsetMesh", &sharpOffsetMesh );
	function( "generalOffsetMesh", &generalOffsetMesh );
	function( "thickenMesh", &thickenMesh );
	function( "offsetOneDirection", &offsetOneDirection );
	function( "offsetPolyline", &offsetPolyline );
	///


	/// Impl
	function( "thickenMeshImpl", &MRJS::thickenMeshImpl );
	function( "thickenMeshFilledImpl", &MRJS::thickenMeshFilledImpl );
	function( "thickenMeshWithTensionImpl", &MRJS::thickenMeshWithTensionImpl );
	function( "generateOrthodonticBiteImpl", &MRJS::generateOrthodonticBiteImpl );
	function( "generateOrthodonticBiteWithFillHoleMetricImpl", &MRJS::generateOrthodonticBiteWithFillHoleMetricImpl );
	///
}
