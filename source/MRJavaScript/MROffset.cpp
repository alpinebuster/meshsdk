#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRTriMesh.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRSharpenMarchingCubesMesh.h>
#include <MRMesh/MRVolumeIndexer.h>
#include <MRMesh/MRMeshFixer.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRMeshFillHole.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRPositionVertsSmoothly.h>

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

val thickenMeshImplFilled( const Mesh& mesh, float offset, GeneralOffsetParameters &params )
{
	val returnObj = val::object();

	Mesh meshCopy;
	meshCopy.topology = mesh.topology;
	meshCopy.points = mesh.points;

	MeshBuilder::uniteCloseVertices( meshCopy, meshCopy.computeBoundingBox().diagonal() * 1e-6 );
	auto result = thickenMesh( mesh, offset, params );
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

		std::vector<float> holesLength( holes.size() );
		std::vector<Vector3f> holeCenters( holes.size() );

		for ( size_t i = 0; i < holes.size(); ++i )
		{
			float length = 0.0f;
			Vector3f center;
			for ( EdgeId e : holes[i] )
			{
				auto org = shell.topology.org( e );
				auto dest = shell.topology.dest( e );
				length += ( shell.points[dest] - shell.points[org] ).length();
				center += shell.points[org];
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
		if ( maxLengthI2 != -1 )
			holePairs.push_back( { maxLengthI, maxLengthI2 } );

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
		FaceBitSet newFaces;
		StitchHolesParams stitchParams;
		stitchParams.metric = getMinAreaMetric( shell );
		stitchParams.outNewFaces = &newFaces;

		for ( const auto& pair : holePairs )
		{
			if ( pair[0] < holes.size() && pair[1] < holes.size() )
			{
				if ( !holes[pair[0]].empty() && !holes[pair[1]].empty() )
					buildCylinderBetweenTwoHoles( shell, holes[pair[0]][0], holes[pair[1]][0], stitchParams );
			}
		}

		// Subdivide new faces
		SubdivideSettings subdivSettings;
		subdivSettings.region = &newFaces;
		subdivSettings.maxEdgeSplits = INT_MAX;
		subdivSettings.maxEdgeLen = 1.0f;

		subdivideMesh( shell, subdivSettings );

		// Smooth vertices
		auto smoothVerts = getInnerVerts( shell.topology, newFaces );
		positionVertsSmoothly( shell, smoothVerts );


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

	function( "thickenMeshImpl", &MRJS::thickenMeshImpl );
	function( "thickenMeshImplFilled", &MRJS::thickenMeshImplFilled );
}
