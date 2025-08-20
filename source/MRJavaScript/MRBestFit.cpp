#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRAffineXf.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRPolylineEdgeIterator.h>
#include <MRMesh/MRPointCloud.h>
#include <MRMesh/MRLine3.h>
#include <MRMesh/MRPlane3.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRSymMatrix3.h>
#include <MRMesh/MRMatrix3.h>
#include <MRMesh/MRPolyline.h>
#include <MRMesh/MRPointCloudPart.h>
#include <MRMesh/MRBestFit.h>

using namespace emscripten;
using namespace MR;


template <typename T>
struct CrossPointResultT
{
    T point;
    int rank;
    T space;
};
using CrossPointResult = CrossPointResultT<Vector3d>;
using CrossPointResultf = CrossPointResultT<Vector3f>;


EMSCRIPTEN_BINDINGS( BestFitModule )
{
    /**
     * ----------------- EXAMPLE USAGE -----------------
     * 
     *    Mesh mesh = makeUVSphere();
     *
     *    auto box = mesh.computeBoundingBox();
     *    auto boxCenter = box.center();
     *    std::cout << "Box center: " << boxCenter << std::endl;
     *
     *    PointAccumulator pointAccum;
     *
     *    // Accumulate all triangle centroids, weighted by area.
     *    accumulateFaceCenters(pointAccum, mesh);
     *
     *    // Compute the eigendecomposition of the covariance matrix.
     *    Vector3f centroid;
     *    Matrix3f eigenvectors;
     *    Vector3f eigenvalues;
     *
     *    if (pointAccum.getCenteredCovarianceEigen(centroid, eigenvectors, eigenvalues))
     *    {
     *        std::cout << "Centroid: " << centroid << std::endl;
     *        std::cout << "Eigenvalues: " << eigenvalues << std::endl;
     *        std::cout << "Eigenvectors:\n" << eigenvectors << std::endl;
     *    }
     *    else
     *    {
     *        std::cout << "Failed to compute eigen decomposition." << std::endl;
     *    }
     * 
     */
    class_<PointAccumulator>( "PointAccumulator" )
        .constructor<>()

        .function( "addPoint", select_overload<void( const Vector3d& )>( &PointAccumulator::addPoint ) )
        .function( "addPointWithWeighted", select_overload<void( const Vector3d&, double )>( &PointAccumulator::addPoint ) )

        .function( "addPointf", select_overload<void( const Vector3f& )>( &PointAccumulator::addPoint ) )
        .function( "addPointfWithWeighted", select_overload<void( const Vector3f&, float )>( &PointAccumulator::addPoint ) )


        .function( "getBestPlane", &PointAccumulator::getBestPlane )
        .function( "getBestPlanef", &PointAccumulator::getBestPlanef )

        .function( "getBestLine", &PointAccumulator::getBestLine )
        .function( "getBestLinef", &PointAccumulator::getBestLinef )

        .function( "getCenteredCovarianceEigen", select_overload<bool (Vector3d &, Matrix3d &, Vector3d &) const>( &PointAccumulator::getCenteredCovarianceEigen ))
        .function( "getCenteredCovarianceEigenf", select_overload<bool (Vector3f &, Matrix3f &, Vector3f &) const>( &PointAccumulator::getCenteredCovarianceEigen ))

        .function( "getBasicXf", &PointAccumulator::getBasicXf )
        .function( "getBasicXf3f", &PointAccumulator::getBasicXf3f )

        .function( "get4BasicXfs", &PointAccumulator::get4BasicXfs )
        .function( "get4BasicXfs3f", &PointAccumulator::get4BasicXfs3f )

        .function( "valid", &PointAccumulator::valid );


    function( "accumulatePoints", select_overload<void (PointAccumulator&, const std::vector<Vector3f>&, const AffineXf3f*)>( &accumulatePoints ), allow_raw_pointers() );
    function( "accumulatePointsFromRegion", select_overload<void (PointAccumulator&, const PointCloudPart&, const AffineXf3f*)>( &accumulatePoints ), allow_raw_pointers() );

    function( "accumulateWeighedPoints", &accumulateWeighedPoints, allow_raw_pointers() );
    function( "accumulateFaceCenters", &accumulateFaceCenters, allow_raw_pointers() );
    function( "accumulateLineCenters", &accumulateLineCenters, allow_raw_pointers() );


    value_object<CrossPointResult>( "CrossPointResult" )
        .field( "point", &CrossPointResult::point )
        .field( "rank", &CrossPointResult::rank )
        .field( "space", &CrossPointResult::space );

    value_object<CrossPointResultf>( "CrossPointResultf" )
        .field( "point", &CrossPointResultf::point )
        .field( "rank", &CrossPointResultf::rank )
        .field( "space", &CrossPointResultf::space );

    class_<PlaneAccumulator>( "PlaneAccumulator" )
        .constructor<>()

        .function( "addPlane", select_overload<void( const Plane3d& )>( &PlaneAccumulator::addPlane ) )
        .function( "addPlanef", select_overload<void( const Plane3f& )>( &PlaneAccumulator::addPlane ) )


        /// NOTE: handle `int*`
        .function("findBestCrossPoint", optional_override(
            [] ( PlaneAccumulator& self, const Vector3d& p0, double tol ) -> CrossPointResult
            {
                CrossPointResult res;
                res.rank = 0;
                res.space = Vector3d();
                res.point = self.findBestCrossPoint( p0, tol, &res.rank, &res.space );
                return res;
            }
        ))
        .function("findBestCrossPointf", optional_override(
            [] ( PlaneAccumulator& self, const Vector3f& p0, float tol ) -> CrossPointResultf
            {
                CrossPointResultf res;
                int rank = 0;
                Vector3f space;
                res.point = self.findBestCrossPoint( p0, tol, &rank, &space );
                res.rank = rank;
                res.space = Vector3f(space);
                return res;
            }
        ));
        ///
}
