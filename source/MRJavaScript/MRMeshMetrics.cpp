#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshDelone.h>
#include <MRMesh/MRTriMath.h>
#include <MRMesh/MRPlane3.h>
#include <MRMesh/MRBestFit.h>
#include <MRMesh/MRConstants.h>
#include <MRMesh/MRMeshMetrics.h>

#include "MRMeshMetrics.h"

using namespace emscripten;
using namespace MR;


const FillHoleMetric& FillHoleMetricWrapper::getFillHoleMetric() const
{
	return fillHoleMetric;
}
FillHoleMetric& FillHoleMetricWrapper::getFillHoleMetric()
{
	return fillHoleMetric;
}

const FillTriangleMetric& FillHoleMetricWrapper::getFillTriangleMetric() const
{
	return fillHoleMetric.triangleMetric;
}
FillTriangleMetric& FillHoleMetricWrapper::getFillTriangleMetric()
{
	return fillHoleMetric.triangleMetric;
}

const FillEdgeMetric& FillHoleMetricWrapper::getFillEdgeMetric() const
{
	return fillHoleMetric.edgeMetric;
}
FillEdgeMetric& FillHoleMetricWrapper::getFillEdgeMetric()
{
	return fillHoleMetric.edgeMetric;
}

const FillCombineMetric& FillHoleMetricWrapper::getFillCombineMetric() const
{
	return fillHoleMetric.combineMetric;
}
FillCombineMetric& FillHoleMetricWrapper::getFillCombineMetric()
{
	return fillHoleMetric.combineMetric;
}

FillHoleMetricWrapper& FillHoleMetricWrapper::operator=( const FillHoleMetricWrapper& other )
{
	if ( this != &other )
	{
		fillHoleMetric.triangleMetric = other.fillHoleMetric.triangleMetric;
		fillHoleMetric.edgeMetric = other.fillHoleMetric.edgeMetric;
		fillHoleMetric.combineMetric = other.fillHoleMetric.combineMetric;
	}
	return *this;
}


///
/// Factory functions that return wrapped metrics
///
FillHoleMetricWrapper createCircumscribedMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getCircumscribedMetric( mesh ) );
}

FillHoleMetricWrapper createPlaneFillMetric( const Mesh& mesh, EdgeId e )
{
	return FillHoleMetricWrapper( getPlaneFillMetric( mesh, e ) );
}
FillHoleMetricWrapper createPlaneNormalizedFillMetric( const Mesh& mesh, EdgeId e )
{
	return FillHoleMetricWrapper( getPlaneNormalizedFillMetric( mesh, e ) );
}

FillHoleMetricWrapper createComplexStitchMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getComplexStitchMetric( mesh ) );
}
FillHoleMetricWrapper createEdgeLengthFillMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getEdgeLengthFillMetric( mesh ) );
}
FillHoleMetricWrapper createEdgeLengthStitchMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getEdgeLengthStitchMetric( mesh ) );
}
FillHoleMetricWrapper createVerticalStitchMetric( const Mesh& mesh, const Vector3f& upDir )
{
	return FillHoleMetricWrapper( getVerticalStitchMetric( mesh, upDir ) );
}

FillHoleMetricWrapper createComplexFillMetricWithEdgeId( const Mesh& mesh, EdgeId e )
{
	return FillHoleMetricWrapper( getComplexFillMetric( mesh, e ) );
}

FillHoleMetricWrapper createComplexFillMetricWithPlane3f( const Mesh& mesh, EdgeId e, const Plane3f* plane = nullptr )
{
	return FillHoleMetricWrapper( getParallelPlaneFillMetric( mesh, e, plane ) );
}

FillHoleMetricWrapper createComplexFillMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getMaxDihedralAngleMetric( mesh ) );
}

FillHoleMetricWrapper createUniversalMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getUniversalMetric( mesh ) );
}

FillHoleMetricWrapper createMinTriAngleMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getMinTriAngleMetric( mesh ) );
}

FillHoleMetricWrapper createMinAreaMetric( const Mesh& mesh )
{
	return FillHoleMetricWrapper( getMinAreaMetric( mesh ) );
}


EMSCRIPTEN_BINDINGS( MeshMetricsWrapperModule )
{
	class_<FillHoleMetricWrapper>( "FillHoleMetricWrapper" )
		.constructor<const FillHoleMetricWrapper&>()
		.class_function( "createFillHoleMetricWrapperFromOther",
			optional_override( [] ( const FillHoleMetricWrapper& other )
			{
				return FillHoleMetricWrapper( other );
			} )
		);


	function( "createCircumscribedMetric", &createCircumscribedMetric );
	function( "createPlaneFillMetric", &createPlaneFillMetric );
	function( "createPlaneNormalizedFillMetric", &createPlaneNormalizedFillMetric );
	function( "createComplexStitchMetric", &createComplexStitchMetric );
	function( "createEdgeLengthFillMetric", &createEdgeLengthFillMetric );
	function( "createEdgeLengthStitchMetric", &createEdgeLengthStitchMetric );
	function( "createVerticalStitchMetric", &createVerticalStitchMetric );
	function( "createComplexFillMetricWithEdgeId", &createComplexFillMetricWithEdgeId );
	function( "createComplexFillMetricWithPlane3f", &createComplexFillMetricWithPlane3f, allow_raw_pointers() );
	function( "createComplexFillMetric", &createComplexFillMetric );
	function( "createUniversalMetric", &createUniversalMetric );
	function( "createMinTriAngleMetric", &createMinTriAngleMetric );
	function( "createMinAreaMetric", &createMinAreaMetric );
}


EMSCRIPTEN_BINDINGS( MeshMetricsModule )
{
	///
	class_<FillHoleMetric>( "FillHoleMetric" )
		.constructor<>()
		.property( "triangleMetric", &FillHoleMetric::triangleMetric )
		.property( "edgeMetric", &FillHoleMetric::edgeMetric )
		.property( "combineMetric", &FillHoleMetric::combineMetric );

	class_<std::function<double ( VertId, VertId, VertId )>>( "FillTriangleMetric" )
		.constructor<>()
		.function( "opcall", &std::function<double ( VertId, VertId, VertId )>::operator() );
	class_<std::function<double ( VertId, VertId, VertId, VertId )>>( "FillEdgeMetric" )
		.constructor<>()
		.function( "opcall", &std::function<double ( VertId, VertId, VertId, VertId )>::operator() );
	class_<std::function<double ( double, double )>>( "FillCombineMetric" )
		.constructor<>()
		.function( "opcall", &std::function<double ( double, double )>::operator() );
	///


	function( "calcCombinedFillMetric", &calcCombinedFillMetric );
	function( "getCircumscribedMetric", &getCircumscribedMetric );
	function( "getPlaneFillMetric", &getPlaneFillMetric );
	function( "getPlaneNormalizedFillMetric", &getPlaneNormalizedFillMetric );
	function( "getComplexStitchMetric", &getComplexStitchMetric );
	function( "getEdgeLengthFillMetric", &getEdgeLengthFillMetric );
	function( "getEdgeLengthStitchMetric", &getEdgeLengthStitchMetric );
	function( "getVerticalStitchMetric", &getVerticalStitchMetric );
	function( "getComplexFillMetric", &getComplexFillMetric );
	function( "getParallelPlaneFillMetric", &getParallelPlaneFillMetric, allow_raw_pointers() );
	function( "getMaxDihedralAngleMetric", &getMaxDihedralAngleMetric );
	function( "getUniversalMetric", &getUniversalMetric );
	function( "getMinTriAngleMetric", &getMinTriAngleMetric );
	function( "getMinAreaMetric", &getMinAreaMetric );
}
