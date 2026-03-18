#include <functional>
#include <Eigen/Dense> // for PCA

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRPlane3.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshCollide.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRMeshRelax.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRMeshBoolean.h>
#include <MRMesh/MRMeshNormals.h>
#include <MRMesh/MREdgeIterator.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRStringConvert.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRMeshDecimate.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRSharpenMarchingCubesMesh.h>
#include <MRMesh/MRVolumeIndexer.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshFixer.h>
#include <MRMesh/MRPositionVertsSmoothly.h>
#include <MRMesh/MRConvexHull.h>
#include <MRMesh/MRMeshMetrics.h>
#include <MRMesh/MRExpandShrink.h>
#include <MRMesh/MRMeshFillHole.h>

#include <MRVoxels/MROffset.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshFillHoleModule )
{
    enum_<FillHoleParams::MultipleEdgesResolveMode>( "MultipleEdgesResolveMode" )
        .value( "None", FillHoleParams::MultipleEdgesResolveMode::None )
        .value( "Simple", FillHoleParams::MultipleEdgesResolveMode::Simple )
        .value( "Strong", FillHoleParams::MultipleEdgesResolveMode::Strong );
	
	class_<FillHoleParams>( "FillHoleParams" )
		.constructor<>()
		.property( "metric", &FillHoleParams::metric )
		.property( "outNewFaces", &FillHoleParams::outNewFaces, return_value_policy::reference() )
		.property( "multipleEdgesResolveMode", &FillHoleParams::multipleEdgesResolveMode )
		.property( "makeDegenerateBand", &FillHoleParams::makeDegenerateBand )
		.property( "maxPolygonSubdivisions", &FillHoleParams::maxPolygonSubdivisions )

		.function( "getStopBeforeBadTriangulation", optional_override( [] ( FillHoleParams& self )
		{
			if ( !self.stopBeforeBadTriangulation ) throw std::runtime_error( "stopBeforeBadTriangulation is null" );
			return *self.stopBeforeBadTriangulation;
		}))
		.function( "setStopBeforeBadTriangulation", optional_override( [] ( FillHoleParams& self, bool v )
		{
			if ( !self.stopBeforeBadTriangulation ) self.stopBeforeBadTriangulation = new bool;
			*self.stopBeforeBadTriangulation = v;
		}));

	class_<StitchHolesParams>( "StitchHolesParams" )
		.constructor<>()

		.property( "metric", &StitchHolesParams::metric )
		.property( "outNewFaces", &StitchHolesParams::outNewFaces, return_value_policy::reference() );

	
	value_object<FillHoleItem>( "FillHoleItem" )
		.field( "edgeCode1", &FillHoleItem::edgeCode1 )
		.field( "edgeCode2", &FillHoleItem::edgeCode2 );

	value_object<HoleFillPlan>( "HoleFillPlan" )
		.field( "items", &HoleFillPlan::items )
		.field( "numTris", &HoleFillPlan::numTris );

	class_<MakeBridgeResult>( "MakeBridgeResult" )
		.constructor<>()

		.property( "newFaces", &MakeBridgeResult::newFaces )
		.property( "na", &MakeBridgeResult::na )
		.property( "nb", &MakeBridgeResult::nb )

        .function( "opbool", select_overload<bool() const>( &MakeBridgeResult::operator bool ) );


	///
	function( "fillHole", &fillHole );
	function( "fillHoles", &fillHoles );

	function( "isHoleBd", &isHoleBd );
	function( "getHoleFillPlan", &getHoleFillPlan );
	function( "getHoleFillPlans", &getHoleFillPlans );
	function( "getPlanarHoleFillPlan", &getPlanarHoleFillPlan );
	function( "getPlanarHoleFillPlans", &getPlanarHoleFillPlans );

	function( "executeHoleFillPlan", &executeHoleFillPlan, allow_raw_pointers() );
	function( "fillHoleTrivially", &fillHoleTrivially, allow_raw_pointers() );

	function( "extendHole", select_overload<EdgeId( Mesh&, EdgeId, const Plane3f &, FaceBitSet * )>( &extendHole ), allow_raw_pointers() );
	function( "extendAllHoles", &extendAllHoles, allow_raw_pointers() );
	function( "extendHoleWithFunctor", select_overload<EdgeId( Mesh&, EdgeId, std::function<Vector3f(const Vector3f &)>, FaceBitSet * )>( &extendHole ), allow_raw_pointers() );

	function( "buildBottom", &buildBottom, allow_raw_pointers() );
	function( "makeDegenerateBandAroundHole", &makeDegenerateBandAroundHole, allow_raw_pointers() );

	function( "makeQuadBridge", &makeQuadBridge, allow_raw_pointers() );
	function( "makeBridge", &makeBridge, allow_raw_pointers() );
	function( "makeSmoothBridge", &makeSmoothBridge, allow_raw_pointers() );
	function( "makeBridgeEdge", &makeBridgeEdge );
	function( "splitQuad", &splitQuad, allow_raw_pointers() );
	///
}
