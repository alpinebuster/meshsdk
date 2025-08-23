#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRLine3.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRAffineXf.h>
#include <MRMesh/MRMeshProject.h>
#include <MRMesh/MRPolylineProject.h>
#include <MRMesh/MRMeshBoolean.h>
#include <MRMesh/MROneMeshContours.h>
#include <MRMesh/MRMeshIntersect.h>
#include <MRMesh/MRParallelFor.h>
#include <MRMesh/MRFillContour.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshFillHole.h>
#include <MRMesh/MRMeshDecimate.h>
#include <MRMesh/MRContoursCut.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;


/**
 *@brief Cut mesh with polyline
 *
 * 1. Project points of polyline to mesh
 * 2. Convert result vector to `cutMesh()` input type
 * 3. Do `cutMesh()` (it works only with contours without self-intersections)
 *
 * @param mesh
 * @param coordinates Must be closed
 * @param coordinatesLength 
 * @return val 
 */
val cutMeshWithPolylineImpl( Mesh& mesh, const std::vector<float>& coordinates )
{
	std::vector<Vector3f> polyline;

    int coordinatesLength = coordinates.size();
    if ( coordinatesLength % 3 != 0 ) {
		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "Coordinates length must be a multiple of 3!" );

		return obj;
    }
	polyline.reserve( coordinatesLength / 3 );

	for ( size_t i = 0; i < coordinatesLength; i += 3 )
	{
		polyline.emplace_back( coordinates[i], coordinates[i + 1], coordinates[i + 2] );
	}
	Polyline3 initialPolyline;
	initialPolyline.addFromPoints( polyline.data(), polyline.size(), true );

	std::vector<MeshTriPoint> projectedPolyline;
	projectedPolyline.reserve( initialPolyline.points.size() );
	MeshPart m = MeshPart( mesh, nullptr );

	mesh.getAABBTree(); // Create tree in parallel before loop
	for ( Vector3f pt : initialPolyline.points )
	{
		MeshProjectionResult mpr = findProjection( pt, m );
		projectedPolyline.push_back( mpr.mtp );
	}

	auto meshContour = convertMeshTriPointsToMeshContour( mesh, projectedPolyline );
	if ( meshContour )
	{
		CutMeshResult cutResults = cutMesh( mesh, { *meshContour } );

		auto [smallerMesh, largerMesh] = MRJS::returnParts( mesh, cutResults.resultCut );
		val smallerMeshData = MRJS::exportMeshMemoryView( smallerMesh );
		val largeMeshData = MRJS::exportMeshMemoryView( largerMesh );

		val obj = val::object();
		obj.set( "success", true );
		obj.set( "smallerMesh", smallerMesh );
		obj.set( "largerMesh", largerMesh );
		obj.set( "smallerMeshMV", smallerMeshData );
		obj.set( "largerMeshMV", largeMeshData );

		return obj;
	} else {
		std::string error = meshContour.error();

		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "convertMeshTriPointsToMeshContour: " + error );
	
		return obj;
	}
}

/**
 * The input polyline must be closed!!!
 */
val cutMeshByContourImpl( Mesh& mesh, const std::vector<float>& coordinates )
{
    int coordinatesLength = coordinates.size();
    if ( coordinatesLength % 3 != 0 ) {
		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "Coordinates length must be a multiple of 3!" );

		return obj;
    }

    MR::Contour3f cont( coordinatesLength / 3 );
    for ( int i = 0; i < cont.size(); ++i )
        cont[i] = MR::Vector3f( coordinates[3 * i + 0], coordinates[3 * i + 1], coordinates[3 * i + 2] );

    auto cutRes = MR::cutMeshByContour( mesh, cont );

	auto [smallerMesh, largerMesh] = MRJS::returnParts( mesh, *cutRes );
	val smallerMeshData = MRJS::exportMeshMemoryView( smallerMesh );
	val largerMeshData = MRJS::exportMeshMemoryView( largerMesh );


	val obj = val::object();
	obj.set( "success", true );
	obj.set( "smallerMesh", smallerMesh );
	obj.set( "largerMesh", largerMesh );
	obj.set( "smallerMeshMV", smallerMeshData );
	obj.set( "largerMeshMV", largerMeshData );

	return obj;
}

val cutMeshWithPolylineImplTest( Mesh& mesh, const std::vector<float>& coordinates )
{
	std::vector<Vector3f> polyline;

	int coordinatesLength = coordinates.size();
	if ( coordinatesLength % 3 != 0 )
	{
		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "Coordinates length must be a multiple of 3!" );

		return obj;
	}

	polyline.reserve( coordinatesLength / 3 );

	for ( size_t i = 0; i < coordinatesLength; i += 3 )
	{
		polyline.emplace_back( coordinates[i], coordinates[i + 1], coordinates[i + 2] );
	}
	Polyline3 initialPolyline;
	initialPolyline.addFromPoints( polyline.data(), polyline.size(), true );

	std::vector<MeshTriPoint> projectedPolyline;
	projectedPolyline.reserve( initialPolyline.points.size() );
	MeshPart m = MeshPart( mesh );


	val jsTestProjectedPoint = val::array();

	mesh.getAABBTree(); // Create tree in parallel before loop
	for ( Vector3f pt : initialPolyline.points )
	{
		MeshProjectionResult mpr = findProjection( pt, m );
		projectedPolyline.push_back( mpr.mtp );


		val projPoint = val::object();
		projPoint.set( "x", mpr.proj.point.x );
		projPoint.set( "y", mpr.proj.point.y );
		projPoint.set( "z", mpr.proj.point.z );
		jsTestProjectedPoint.call<void>( "push", projPoint );
	}

	auto meshContour = convertMeshTriPointsToMeshContour( mesh, projectedPolyline );
	if ( meshContour )
	{
		const OneMeshContour& testContour = *meshContour;
		val jsTestProjectedContour = val::array();
		for ( const auto& intersection : testContour.intersections )
		{
			val point = val::object();
			point.set( "x", intersection.coordinate.x );
			point.set( "y", intersection.coordinate.y );
			point.set( "z", intersection.coordinate.z );
			jsTestProjectedContour.call<void>( "push", point );
		}

		CutMeshResult cutResults = cutMesh( mesh, { *meshContour } );


		val jsTestCutPoints = val::array();
		for ( const auto& loop : cutResults.resultCut )
		{
			for ( const auto& edge : loop )
			{
				Vector3f p = mesh.orgPnt( edge );
				val point = val::object();
				point.set( "x", p.x );
				point.set( "y", p.y );
				point.set( "z", p.z );
				jsTestCutPoints.call<void>( "push", point );
			}
		}

		auto [smallerMesh, largerMesh] = MRJS::returnParts( mesh, cutResults.resultCut );
		val smallerMeshData = MRJS::exportMeshMemoryViewTest( smallerMesh );
		val largerMeshData = MRJS::exportMeshMemoryViewTest( largerMesh );


		val obj = val::object();
		obj.set( "success", true );
		obj.set( "smallerMesh", smallerMesh );
		obj.set( "largerMesh", largerMesh );
		obj.set( "smallerMeshMV", smallerMeshData );
		obj.set( "largerMeshMV", largerMeshData );
		obj.set( "cutResults", cutResults );
		obj.set( "meshContour", meshContour );
		obj.set( "projectedPolyline", projectedPolyline );
		obj.set( "jsTestProjectedPoint", jsTestProjectedPoint );
		obj.set( "jsTestProjectedContour", jsTestProjectedContour );
		obj.set( "jsTestCutPoints", jsTestCutPoints );

		return obj;
	} else {
		std::string error = meshContour.error();

		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "convertMeshTriPointsToMeshContour: " + error );
	
		return obj;
	}
}
val cutMeshByContourImplTest( Mesh& mesh, const std::vector<float>& coordinates )
{
    int coordinatesLength = coordinates.size();
    if ( coordinatesLength % 3 != 0 ) {
		val obj = val::object();
		obj.set( "success", false );
		obj.set( "error", "Coordinates length must be a multiple of 3!" );

		return obj;
    }

	std::vector<Vector3f> polyline;
	polyline.reserve( coordinatesLength / 3 );
	for ( size_t i = 0; i < coordinatesLength; i += 3 )
	{
		polyline.emplace_back( Vector3f( coordinates[i], coordinates[i + 1], coordinates[i + 2] ) );
	}

	auto expectedFaceBitSet = cutMeshByContour( mesh, polyline );

	auto [smallerMesh, largerMesh] = MRJS::returnParts( mesh, *expectedFaceBitSet );
	val smallerMeshData = MRJS::exportMeshMemoryView( smallerMesh );
	val largerMeshData = MRJS::exportMeshMemoryView( largerMesh );


	val obj = val::object();
	obj.set( "success", true );
	obj.set( "smallerMesh", smallerMesh );
	obj.set( "largerMesh", largerMesh );
	obj.set( "smallerMeshMV", smallerMeshData );
	obj.set( "largerMeshMV", largerMeshData );

	return obj;
}

/**
 *@brief Cut and extrude mesh with polyline
 *
 * 1. Project points of polyline to mesh
 * 2. Convert result vector to `cutMesh()` input type
 * 3. Do `cutMesh()` (it works only with contours without self-intersections)
 * 4. Pull `resultCut` vertices to corresponding original polyline positions
 *
 * @param mesh
 * @param coordinates 
 * @param coordinatesLength 
 * @return val 
 */
val cutAndExtrudeMeshWithPolylineImpl( Mesh& mesh, const std::vector<float>& coordinates )
{
	val obj = val::object();

	int coordinatesLength = coordinates.size();
    if (coordinatesLength % 3 != 0) {
		obj.set( "success", false );
		obj.set( "error", "Coordinates length must be a multiple of 3!" );
		return obj;
    }

	std::vector<Vector3f> polyline;
	polyline.reserve( coordinatesLength / 3 );

	for ( size_t i = 0; i < coordinatesLength; i += 3 )
	{
		polyline.emplace_back( coordinates[i], coordinates[i + 1], coordinates[i + 2] );
	}
	Polyline3 initialPolyline;
	initialPolyline.addFromPoints( polyline.data(), polyline.size(), true );

	// Initializing the vector with a certain length
	std::vector<MeshTriPoint> projectedPolyline( initialPolyline.points.size() );
	const MeshPart m = MeshPart( mesh, nullptr );
	const Vector3f vectorUp = Vector3f( 0, 0, 1 );
	// const Vector3f vectorDown = Vector3f( 0, 0, -1 );

	mesh.getAABBTree(); // Create tree in parallel before loop
	ParallelFor( initialPolyline.points, [&] ( VertId v )
	{
		const auto& pt = initialPolyline.points[v];
		auto rmi = rayMeshIntersect( m, Line3f( pt - 100 * vectorUp, vectorUp ) );

		if ( rmi ) projectedPolyline[v.get()] = rmi.mtp;
	} );

	// Make sure to weed out points which never hit the target mesh
	std::vector<MeshTriPoint> validPoints;
	std::copy_if( projectedPolyline.begin(), projectedPolyline.end(), std::back_inserter( validPoints ), [] ( const MeshTriPoint& point )
	{
		return point.e.valid();
	} );

	if ( !validPoints.empty() )
	{
		auto meshContour = convertMeshTriPointsToMeshContour( mesh, validPoints );
		if ( meshContour ) {
			CutMeshResult cutResults = cutMesh( mesh, { *meshContour } );

			initialPolyline.getAABBTree(); // create tree in parallel before loop
			for ( const EdgeLoop& cut : cutResults.resultCut )
			{
				ParallelFor( cut, [&] ( size_t i )
				{
					Vector3f& orgP = mesh.points[mesh.topology.org( cut[i] )];
					orgP = findProjectionOnPolyline( Line3f( orgP, vectorUp ), initialPolyline ).point;
				} );

				if ( mesh.topology.org( cut.front() ) != mesh.topology.dest( cut.back() ) )
				{
					Vector3f& destP = mesh.points[mesh.topology.dest( cut.back() )];
					destP = findProjectionOnPolyline( Line3f( destP, vectorUp ), initialPolyline ).point;
				}
			}

			// important to call after manual changing of mesh structure fields
			mesh.invalidateCaches();
		} else {
			std::string error = meshContour.error();

			obj.set( "success", false );
			obj.set( "error", error );

			return obj;
		}
	}
	

	val resultMeshData = MRJS::exportMeshMemoryView( mesh );
	obj.set( "success", true );
	obj.set( "mesh", resultMeshData );

	return obj;
}


EMSCRIPTEN_BINDINGS( ContoursCutModule )
{
	class_<NewEdgesMap>( "NewEdgesMap" )
        .constructor<>()
        .property( "splitEdges", &NewEdgesMap::splitEdges )
		.property( "map", &NewEdgesMap::map );
	
	enum_<CutMeshParameters::ForceFill>( "ForceFill" )
		.value( "None", CutMeshParameters::ForceFill::None )
		.value( "Good", CutMeshParameters::ForceFill::Good )
		.value( "All", CutMeshParameters::ForceFill::All );
	
	class_<CutMeshParameters>( "CutMeshParameters" )
		.constructor<>()
		.property( "sortData", &CutMeshParameters::sortData, return_value_policy::reference() ) // SortIntersectionsData*
		.property( "new2OldMap", &CutMeshParameters::new2OldMap, return_value_policy::reference() ) // FaceMap*
		.property( "forceFillMode", &CutMeshParameters::forceFillMode )
		.property( "new2oldEdgesMap", &CutMeshParameters::new2oldEdgesMap, return_value_policy::reference() ) // NewEdgesMap*
		;

	value_object<CutMeshResult>( "CutMeshResult" )
		.field( "resultCut", &CutMeshResult::resultCut )
		.field( "fbsWithContourIntersections", &CutMeshResult::fbsWithContourIntersections );


	///
	function( "cutMesh", &cutMesh );
	function( "cutMeshByContour", &cutMeshByContour);

	function( "convertMeshTriPointsSurfaceOffsetToMeshContours",
		select_overload<Expected<OneMeshContours>( const Mesh&, const std::vector<MeshTriPoint>&, float, SearchPathSettings )>(
			&convertMeshTriPointsSurfaceOffsetToMeshContours
		),
		allow_raw_pointers()
	);
	function( "convertMeshTriPointsSurfaceOffsetToMeshContoursWithFunctor",
		select_overload<Expected<OneMeshContours>( const Mesh&, const std::vector<MeshTriPoint>&, const std::function<float( int )>&, SearchPathSettings )>(
			&convertMeshTriPointsSurfaceOffsetToMeshContours
		),
		allow_raw_pointers()
	);
	///


	///
	function( "cutMeshByContourImpl", &cutMeshByContourImpl );
	function( "cutMeshByContourImplTest", &cutMeshByContourImplTest, allow_raw_pointers() );
	function( "cutMeshWithPolylineImpl", &cutMeshWithPolylineImpl );
	function( "cutMeshWithPolylineImplTest", &cutMeshWithPolylineImplTest );
	function( "cutAndExtrudeMeshWithPolylineImpl", &cutAndExtrudeMeshWithPolylineImpl );
	///
}
