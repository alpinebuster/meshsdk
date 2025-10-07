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
}
