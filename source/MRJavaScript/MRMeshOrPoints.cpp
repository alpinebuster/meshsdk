#include <optional>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshOrPoints.h>
#include <MRMesh/MRMeshProject.h>
#include <MRMesh/MRObjectMesh.h>
#include <MRMesh/MRBestFit.h>
#include <MRMesh/MRAABBTreeObjects.h>
#include <MRMesh/MRPointCloud.h>

using namespace emscripten;
using namespace MR;

void callProjectOnAllWithProgress(
    const Vector3f& pt,
    const AABBTreeObjects& tree,
    float upDistLimitSq,
    val jsCallback,
    ObjId skipObjId = {})
{
    ProjectOnAllCallback cb = [jsCallback]( ObjId id, MeshOrPoints::ProjectionResult res ) {
        jsCallback(id, res); // Call JS func
    };
    projectOnAll(pt, tree, upDistLimitSq, cb, skipObjId);
}

EMSCRIPTEN_BINDINGS( MeshOrPointsModule )
{
	class_<MeshOrPoints>( "MeshOrPoints" )
		.constructor<const Mesh&>()
		// FIXME: BindingError: Cannot register multiple constructors with identical number of parameters (1)
		// .constructor<const MeshPart&>()
		// .constructor<const PointCloud&>()
		.function( "asMeshPart", &MeshOrPoints::asMeshPart, allow_raw_pointers() )
		.function( "asPointCloud", &MeshOrPoints::asPointCloud, allow_raw_pointers() )
		.function( "getObjBoundingBox", &MeshOrPoints::getObjBoundingBox )
		.function( "cacheAABBTree", &MeshOrPoints::cacheAABBTree )
		.function( "computeBoundingBox", &MeshOrPoints::computeBoundingBox, allow_raw_pointers() )
		// .function( "accumulate", &MeshOrPoints::accumulate, allow_raw_pointers() )
		// .function( "pointsGridSampling", &MeshOrPoints::pointsGridSampling )
		.function( "points", &MeshOrPoints::points, allow_raw_pointers() )
		.function( "validPoints", &MeshOrPoints::validPoints, allow_raw_pointers() )
		// .function( "normals", &MeshOrPoints::normals )
		// .function( "weights", &MeshOrPoints::weights )
		// .function( "projector", &MeshOrPoints::projector )
		// .function( "limitedProjector", &MeshOrPoints::limitedProjector )
		;

	value_object<MeshOrPoints::ProjectionResult>( "ProjectionResult" )
		.field( "point", &MeshOrPoints::ProjectionResult::point )
		// .field( "normal", &MeshOrPoints::ProjectionResult::normal )
		.field( "isBd", &MeshOrPoints::ProjectionResult::isBd )
		.field( "distSq", &MeshOrPoints::ProjectionResult::distSq )
		.field( "closestVert", &MeshOrPoints::ProjectionResult::closestVert );

	class_<MeshOrPointsXf>( "MeshOrPointsXf" )
		///
		// NOTE: default constructor of 'MeshOrPointsXf' is implicitly deleted because field 'obj' has no default constructor
		// .constructor<>()
		/// 
		.constructor<const MeshOrPoints&, const AffineXf3f&>()
		.property( "obj", &MeshOrPointsXf::obj )
		.property( "xf", &MeshOrPointsXf::xf );

	// function( "getMeshOrPoints", &getMeshOrPoints, allow_raw_pointers() );
	// function( "projectOnAll", &projectOnAll );
	function( "projectOnAllWithProgress", &callProjectOnAllWithProgress );
}
