#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRIntersectionContour.h>
#include <MRMesh/MRPrecisePredicates3.h>
#include <MRMesh/MRMeshTriPoint.h>
#include <MRMesh/MREdgePoint.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MROneMeshContours.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( OneMeshContoursModule )
{
    class_<SortIntersectionsData>( "SortIntersectionsData" )
        // NOTE: NO constructor!

        .property( "rigidB2A", &SortIntersectionsData::rigidB2A, return_value_policy::reference() )
        .property( "meshAVertsNum", &SortIntersectionsData::meshAVertsNum )
        .property( "isOtherA", &SortIntersectionsData::isOtherA )

        // Safer accessors
        // NOTE: See `MRJavaScript/MRPrecisePredicates3.cpp` for more details
        .function( "getConverter", optional_override( [] ( const SortIntersectionsData& d )
        {
            return d.converter;
        } ) )
        .function("getOtherMesh", optional_override([]( const SortIntersectionsData& d ) -> const Mesh& {
            return d.otherMesh;
        }), allow_raw_pointers())
        .function("getContours", optional_override([]( const SortIntersectionsData& d ) -> const ContinuousContours& {
            return d.contours;
        } ), allow_raw_pointers() );

    
    class_<OneMeshContour>( "OneMeshContour" )
        .constructor<>()
        .property( "intersections", &OneMeshContour::intersections )
        .property( "closed", &OneMeshContour::closed );


    class_<OneMeshIntersection>( "OneMeshIntersection" )
        .constructor<>()

        .property( "coordinate", &OneMeshIntersection::coordinate )
        .function( "primitiveIndex", optional_override( [] ( OneMeshIntersection& self ) -> size_t
        {
            return self.primitiveId.index();
        }) )

        ///
        // Safely get the `FaceId`
        // JS side must check `primitiveIndex() == 0` first
        .function( "getFaceId", optional_override( [] ( OneMeshIntersection& self ) -> FaceId
        {
            return std::get<FaceId>( self.primitiveId );
        }) )
        .function( "getEdgeId", optional_override( [] ( OneMeshIntersection& self ) -> EdgeId
        {
            return std::get<EdgeId>( self.primitiveId );
        }) )
        .function( "getVertId", optional_override( [] ( OneMeshIntersection& self ) -> VertId
        {
            return std::get<VertId>( self.primitiveId );
        }) )
        ///

        // DO the reverse for setters
        .function( "setFaceId", optional_override( [] ( OneMeshIntersection& self, FaceId f )
        {
            self.primitiveId = f;
        }) )
        .function( "setEdgeId", optional_override( [] ( OneMeshIntersection& self, EdgeId e )
        {
            self.primitiveId = e;
        } ) )
        .function( "setVertId", optional_override( [] ( OneMeshIntersection& self, VertId v )
        {
            self.primitiveId = v;
        } ) );


    value_object<SearchPathSettings>( "SearchPathSettings" )
        .field( "geodesicPathApprox", &SearchPathSettings::geodesicPathApprox )
        .field( "maxReduceIters", &SearchPathSettings::maxReduceIters );

    
    function( "subdivideLoneContours", &subdivideLoneContours, allow_raw_pointers() );
    function( "getOneMeshIntersectionContours", &getOneMeshIntersectionContours, allow_raw_pointers() );
    function( "getOneMeshSelfIntersectionContours", &getOneMeshSelfIntersectionContours, allow_raw_pointers() );
    function( "extractMeshContours", &extractMeshContours );

    function( "convertMeshTriPointsToMeshContourWithConnector", select_overload<Expected<OneMeshContour>( const Mesh&, const std::vector<MeshTriPoint>&, MeshTriPointsConnector, std::vector<int>* )>( &convertMeshTriPointsToMeshContour ), allow_raw_pointers() );
    function( "convertMeshTriPointsToMeshContour", select_overload<Expected<OneMeshContour>( const Mesh&, const std::vector<MeshTriPoint>&, SearchPathSettings, std::vector<int>* )>( &convertMeshTriPointsToMeshContour ), allow_raw_pointers() );

    function( "convertMeshTriPointsToClosedContour", &convertMeshTriPointsToClosedContour, allow_raw_pointers() );
    function( "convertSurfacePathWithEndsToMeshContour", &convertSurfacePathWithEndsToMeshContour );
    function( "convertSurfacePathsToMeshContours", &convertSurfacePathsToMeshContours );
}
