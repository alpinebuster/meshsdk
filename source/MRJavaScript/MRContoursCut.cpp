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
}
