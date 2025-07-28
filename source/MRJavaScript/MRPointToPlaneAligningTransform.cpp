#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRQuaternion.h>
#include <MRMesh/MRRigidXf3.h>
#include <MRMesh/MRRigidScaleXf3.h>
#include <MRMesh/MRToFromEigen.h>
#include <MRMesh/MRPointToPlaneAligningTransform.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( PointToPlaneAligningTransformModule )
{
    class_<PointToPlaneAligningTransform>( "PointToPlaneAligningTransform" )
        .constructor<>()

        .function( "add", select_overload<void( const Vector3f&, const Vector3f&, const Vector3f&, float )> ( &PointToPlaneAligningTransform::add ) )
        .function( "addDouble", select_overload<void( const Vector3d&, const Vector3d&, const Vector3d&, double )> ( &PointToPlaneAligningTransform::add ) )

        .function( "prepare", &PointToPlaneAligningTransform::prepare )
        .function( "clear", &PointToPlaneAligningTransform::clear )

        .function( "findBestRigidXf", &PointToPlaneAligningTransform::findBestRigidXf )
        .function( "findBestRigidScaleXf", &PointToPlaneAligningTransform::findBestRigidScaleXf )
        .function( "findBestRigidXfFixedRotationAxis", &PointToPlaneAligningTransform::findBestRigidXfFixedRotationAxis )
        .function( "findBestRigidXfOrthogonalRotationAxis", &PointToPlaneAligningTransform::findBestRigidXfOrthogonalRotationAxis )

        .function( "findBestTranslation", &PointToPlaneAligningTransform::findBestTranslation )
        .function( "calculateAmendment", &PointToPlaneAligningTransform::calculateAmendment )
        .function( "calculateAmendmentWithScale", &PointToPlaneAligningTransform::calculateAmendmentWithScale )
        .function( "calculateFixedAxisAmendment", &PointToPlaneAligningTransform::calculateFixedAxisAmendment )
        .function( "calculateOrthogonalAxisAmendment", &PointToPlaneAligningTransform::calculateOrthogonalAxisAmendment );
}
