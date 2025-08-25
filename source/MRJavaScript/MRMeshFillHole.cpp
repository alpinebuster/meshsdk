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


EdgeId extendHoleWithFuncBasicImpl( Mesh& mesh, EdgeId a, val jsFunc )
{
	// Convert JavaScript function to C++ function
	std::function<Vector3f( const Vector3f& )> cppFunc = [jsFunc] ( const Vector3f& pos ) -> Vector3f
	{
		val result = jsFunc( pos );
		return result.as<Vector3f>();
	};

	return extendHole( mesh, a, cppFunc, nullptr );
}
val extendHoleWithFuncAndOutputImpl( Mesh& mesh, EdgeId a, val jsFunc )
{
	std::function<Vector3f( const Vector3f& )> cppFunc = [jsFunc] ( const Vector3f& pos ) -> Vector3f
	{
		val result = jsFunc( pos );
		return result.as<Vector3f>();
	};

	FaceBitSet outNewFaces;
	EdgeId result = extendHole( mesh, a, cppFunc, &outNewFaces );

	int resultId = static_cast<int>(result);

	const auto& bits = outNewFaces.bits(); // Obtain the `uint64_t` block array
	auto bitsView = typed_memory_view( bits.size(), bits.data() );
	val bitsArray = val( bitsView );

	val returnObj = val::object();
	returnObj.set( "edgeId", resultId );
	returnObj.set( "newFaces", bitsArray );

	return returnObj;
}


val fillAllHolesImpl( Mesh& mesh )
{
	auto holeEdges = mesh.topology.findHoleRepresentiveEdges();

	for ( EdgeId e : holeEdges )
	{
		FillHoleParams params;
		fillHole( mesh, e, params );
	}

	val meshData = MRJS::exportMeshMemoryView( mesh );

	val geoObj = val::object();
	geoObj.set( "success", true );
	geoObj.set( "mesh", mesh );
	geoObj.set( "meshMV", meshData );

	return geoObj;
}
Mesh fillHoleWithSizeLimitImpl( Mesh& mesh, int holeSizeLimit )
{
	///
	// NOTE: The holes will exhibit a line connecting to the origin.
    // 1. Find the representative edges of each hole
    std::vector<EdgeId> holeEdges = mesh.topology.findHoleRepresentiveEdges();  
    // 2. Iterate through all holes
    for ( EdgeId e : holeEdges )
    {
        // 3. Calculate the perimeter of the hole
        double perim = mesh.holePerimiter( e );  
        if ( perim < holeSizeLimit )
        {
            // 4. Fill the hole using default parameters
            FillHoleParams params;  
            // 5. (Optional) If a more optimal algorithm is desired, use `fillHoleNicely(mesh,e,params)`;
            fillHole( mesh, e, params );  
        }
    }
	///
	return mesh;
}


Contour3f extractHoleBoundaryPoints( const Mesh & mesh, const std::vector<EdgeId> & holeEdges )
{
    Contour3f boundaryPoints;
    for ( auto e : holeEdges )
    {
        VertId v = mesh.topology.org( e );
        boundaryPoints.push_back( mesh.points[v] );
    }
    return boundaryPoints;
}
std::pair<Vector3f, Vector3f> computeHoleCentroidAndNormal( const Contour3f & boundaryPoints )
{
    int n = (int)boundaryPoints.size();
    if ( n < 3 )
        return { Vector3f( 0,0,0 ), Vector3f( 0,0,1 ) };

    Eigen::MatrixXf pts( n, 3 );
    for ( int i = 0; i < n; ++i )
    {
        pts(i,0) = boundaryPoints[i].x;
        pts(i,1) = boundaryPoints[i].y;
        pts(i,2) = boundaryPoints[i].z;
    }

    Eigen::RowVector3f centroid_np = pts.colwise().mean();
    Vector3f centroid( centroid_np[0], centroid_np[1], centroid_np[2] );

    Eigen::MatrixXf pts_centered = pts.rowwise() - centroid_np;
    Eigen::Matrix3f cov = (pts_centered.adjoint() * pts_centered) / float(n);

    Eigen::SelfAdjointEigenSolver<Eigen::Matrix3f> eig( cov );
    Eigen::Vector3f normal_np = eig.eigenvectors().col(0); // The direction corresponding to the minimum eigenvalue
    Vector3f normal( normal_np[0], normal_np[1], normal_np[2] );
    normal = normal.normalized();

    return { centroid, normal };
}

Contour3f scaleBoundaryToBBox( const Contour3f & originalPoints, 
                               const Vector3f & originalCentroid,
                               const Vector3f & targetCentroid,
                               const Box3f & bbox,
                               float customScale = 1.0f )
{
    Contour3f translatedPoints;
    translatedPoints.reserve( originalPoints.size() );
    for ( auto & p : originalPoints )
    {
        translatedPoints.push_back( Vector3f(
            p.x + (targetCentroid.x - originalCentroid.x),
            p.y + (targetCentroid.y - originalCentroid.y),
            targetCentroid.z // Stay in the target z-plane
        ) );
    }

    // Calculate the scale
    float minScale = std::numeric_limits<float>::infinity();
    for ( auto & p : translatedPoints )
    {
        Vector3f dirVec = p - targetCentroid;
        if ( dirVec.lengthSq() < 1e-12f )
            continue;

        std::vector<float> possibleScales;
        for ( int k = 0; k < 3; ++k )
        {
            float d = dirVec[k];
            float c = targetCentroid[k];
            float bmin = bbox.min[k];
            float bmax = bbox.max[k];
            if ( std::abs(d) < 1e-6f ) continue;

            float scale = d > 0 ? (bmax - c) / d : (bmin - c) / d;
            if ( scale > 0 )
                possibleScales.push_back( scale );
        }
		
        if ( !possibleScales.empty() )
        {
            float localMin = *std::min_element( possibleScales.begin(), possibleScales.end() );
            minScale = std::min( minScale, localMin );
        }
    }

    float scaleFactor = minScale * customScale;

    // Scale
    Contour3f scaledPoints;
    scaledPoints.reserve( translatedPoints.size() + 1 );
    for ( auto & p : translatedPoints )
    {
        Vector3f offset = p - targetCentroid;
        scaledPoints.push_back( targetCentroid + offset * scaleFactor );
    }
    scaledPoints.push_back( scaledPoints.front() ); // Close the updated curve

    return scaledPoints;
}
val generateOrthodonticBiteImpl( 
	Mesh& meshA, Mesh& meshB, 
	float tension, 
	int numGuides,
	float scale,
	const InflateSettings& inflateSettings, 
	GeneralOffsetParameters &params )
{
	val returnObj = val::object();

	///
	// Handle tension when `tension > 0`
	Mesh curMeshA = (tension > 0) ? offsetOneDirection(MeshPart(meshA), tension, params).value() : meshA;

	Mesh curMeshB = (tension > 0) ? offsetOneDirection(MeshPart(meshB), tension, params).value() : meshB;

	// Connect two meshes
    Mesh mesh;
    mesh.addMesh( curMeshA );
    mesh.addMesh( curMeshB );
    mesh.topology.flipOrientation();

    float avgEdgeLength = mesh.averageEdgeLength();
	///
	

	///
    auto holes = mesh.topology.findHoleRepresentiveEdges();
	if ( holes.size() < 2 )
	{
		returnObj.set( "success", false );

		std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
		returnObj.set( "error: ", errorMessage );

		return returnObj;
	}

    auto holesWithEdges = findRightBoundary( mesh.topology );
    auto hole1Boundary = extractHoleBoundaryPoints( mesh, holesWithEdges[0] );
    auto hole2Boundary = extractHoleBoundaryPoints( mesh, holesWithEdges[1] );

    auto centroid1 = computeHoleCentroidAndNormal( hole1Boundary ).first;
    auto centroid2 = computeHoleCentroidAndNormal( hole2Boundary ).first;

    Box3f bbox = mesh.computeBoundingBox();
	///

	
    for ( int i = 0; i < numGuides; ++i )
    {
        float zRatio = float(i+1) / float(numGuides+1);

    	// Interpolate position between the two centroids
        Vector3f intermediateCentroid = centroid1 * (1.0f - zRatio) + centroid2 * zRatio;

    	// Choose which boundary to use as template (alternate or use the larger one)
		// Generate dynamically scaled and positioned guide curve
        Contour3f guidePoints;
        if ( zRatio < 1/2 )
            guidePoints = scaleBoundaryToBBox( hole1Boundary, centroid1, intermediateCentroid, bbox, scale );
        else
            guidePoints = scaleBoundaryToBBox( hole2Boundary, centroid2, intermediateCentroid, bbox, scale );

    	// Add this guide curve to the mesh as a separate edge loop
        auto loopId = mesh.addSeparateEdgeLoop( guidePoints );
        if ( zRatio < 1/2 ) {
			holes.push_back( loopId.sym() );
			holes.push_back( loopId );
		}
        else {
			holes.push_back( loopId );
			holes.push_back( loopId.sym() );
		}
    }
	
	
	///
    // stitch
    StitchHolesParams sParams;
    sParams.metric = getCircumscribedMetric( mesh );
    auto oldFaces = mesh.topology.getValidFaces();

    for ( int i = 0; i < int(holes.size()/2); ++i )
        buildCylinderBetweenTwoHoles( mesh, holes[i*2], holes[i*2+1], sParams );
	///


	///
    // Post-processing: improve the quality of the newly created surface with subdivide + relax
	// Identify the newly created faces
    auto newFaces = mesh.topology.getValidFaces() - oldFaces;

	// Subdivide the new faces to improve surface quality
    SubdivideSettings sSettings;
    sSettings.maxEdgeLen = avgEdgeLength * 3.0f;
    sSettings.maxEdgeSplits = 1000000;
    sSettings.region = &newFaces;
    subdivideMesh( mesh, sSettings );

	// Get vertices in the new region for smoothing
    auto vertRegion = getIncidentVerts( mesh.topology, newFaces );
    // Shrink the region slightly to avoid affecting the original boundaries
    shrink( mesh.topology, vertRegion, 2 );
	// Smooth the vertices for a more natural surface
    positionVertsSmoothly( mesh, vertRegion, EdgeWeights::Cotan, VertexMass::NeiArea );
	///


	/// inflate new faces
	if ( inflateSettings.pressure > 0 ) {
		inflate( curMeshA, vertRegion, inflateSettings );
	}
	///


	val meshData = MRJS::exportMeshMemoryView( mesh );
	returnObj.set( "success", true );
	returnObj.set( "mesh", mesh );
	returnObj.set( "meshMV", meshData );

	return returnObj;
}
val generateOrthodonticBiteWithFillHoleMetricImpl( 
	Mesh& mesh,  
	int numGuides,
	float scale,
	const InflateSettings& inflateSettings, 
	const FillHoleMetric fillHoleMetric )
{
	val returnObj = val::object();

    float avgEdgeLength = mesh.averageEdgeLength();	

	///
    auto holes = mesh.topology.findHoleRepresentiveEdges();
	if ( holes.size() < 2 )
	{
		returnObj.set( "success", false );

		std::string errorMessage = "Expected 2+ holes, found " + std::to_string( holes.size() ) + "\n";
		returnObj.set( "error: ", errorMessage );

		return returnObj;
	}

    auto holesWithEdges = findRightBoundary( mesh.topology );
    auto hole1Boundary = extractHoleBoundaryPoints( mesh, holesWithEdges[0] );
    auto hole2Boundary = extractHoleBoundaryPoints( mesh, holesWithEdges[1] );

    auto centroid1 = computeHoleCentroidAndNormal( hole1Boundary ).first;
    auto centroid2 = computeHoleCentroidAndNormal( hole2Boundary ).first;

    Box3f bbox = mesh.computeBoundingBox();
	///

	
    for ( int i = 0; i < numGuides; ++i )
    {
        float zRatio = float(i+1) / float(numGuides+1);

    	// Interpolate position between the two centroids
        Vector3f intermediateCentroid = centroid1 * (1.0f - zRatio) + centroid2 * zRatio;

    	// Choose which boundary to use as template (alternate or use the larger one)
		// Generate dynamically scaled and positioned guide curve
        Contour3f guidePoints;
        if ( zRatio < 1/2 )
            guidePoints = scaleBoundaryToBBox( hole1Boundary, centroid1, intermediateCentroid, bbox, scale );
        else
            guidePoints = scaleBoundaryToBBox( hole2Boundary, centroid2, intermediateCentroid, bbox, scale );

    	// Add this guide curve to the mesh as a separate edge loop
        auto loopId = mesh.addSeparateEdgeLoop( guidePoints );
        if ( zRatio < 1/2 ) {
			holes.push_back( loopId.sym() );
			holes.push_back( loopId );
		}
        else {
			holes.push_back( loopId );
			holes.push_back( loopId.sym() );
		}
    }
	
	
	///
    // stitch
    StitchHolesParams sParams;
    sParams.metric = fillHoleMetric;
    auto oldFaces = mesh.topology.getValidFaces();

    for ( int i = 0; i < int(holes.size()/2); ++i )
        buildCylinderBetweenTwoHoles( mesh, holes[i*2], holes[i*2+1], sParams );
	///


	///
    // Post-processing: improve the quality of the newly created surface with subdivide + relax
	// Identify the newly created faces
    auto newFaces = mesh.topology.getValidFaces() - oldFaces;

	// Subdivide the new faces to improve surface quality
    SubdivideSettings sSettings;
    sSettings.maxEdgeLen = avgEdgeLength * 3.0f;
    sSettings.maxEdgeSplits = 1000000;
    sSettings.region = &newFaces;
    subdivideMesh( mesh, sSettings );

	// Get vertices in the new region for smoothing
    auto vertRegion = getIncidentVerts( mesh.topology, newFaces );
    // Shrink the region slightly to avoid affecting the original boundaries
    shrink( mesh.topology, vertRegion, 2 );
	// Smooth the vertices for a more natural surface
    positionVertsSmoothly( mesh, vertRegion, EdgeWeights::Cotan, VertexMass::NeiArea );
	///


	/// inflate new faces
	if ( inflateSettings.pressure > 0 ) {
		inflate( mesh, vertRegion, inflateSettings );
	}
	///


	val meshData = MRJS::exportMeshMemoryView( mesh );
	returnObj.set( "success", true );
	returnObj.set( "mesh", mesh );
	returnObj.set( "meshMV", meshData );

	return returnObj;
}


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
	function( "buildCylinderBetweenTwoHoles", select_overload<bool( Mesh&, const StitchHolesParams& )>( &buildCylinderBetweenTwoHoles ) );
	function( "buildCylinderBetweenTwoHolesWithEdges", select_overload<void( Mesh&, EdgeId, EdgeId, const StitchHolesParams& )>( &buildCylinderBetweenTwoHoles ) );

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


	///
	function( "fillHoleWithSizeLimitImpl", &fillHoleWithSizeLimitImpl );
	function( "fillAllHolesImpl", &fillAllHolesImpl );
	function( "extendHoleWithFuncBasicImpl", &extendHoleWithFuncBasicImpl );
	function( "extendHoleWithFuncAndOutputImpl", &extendHoleWithFuncAndOutputImpl );
	function( "generateOrthodonticBiteImpl", &generateOrthodonticBiteImpl );
	function( "generateOrthodonticBiteWithFillHoleMetricImpl", &generateOrthodonticBiteWithFillHoleMetricImpl );
	///
}
