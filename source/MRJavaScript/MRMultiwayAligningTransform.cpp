#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRPointToPointAligningTransform.h>
#include <MRMesh/MRPointToPlaneAligningTransform.h>
#include <MRMesh/MRAABBTreeObjects.h>
#include <MRMesh/MRRigidXf3.h>
#include <MRMesh/MRMultiwayAligningTransform.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MultiwayAligningTransformModule )
{
    value_object<MultiwayAligningTransform::Stabilizer>( "MultiwayAligningTransformStabilizer" )
        .field( "rot", &MultiwayAligningTransform::Stabilizer::rot )
        .field( "shift", &MultiwayAligningTransform::Stabilizer::shift );


    class_<MultiwayAligningTransform>( "MultiwayAligningTransform" )
        .constructor<>()
        .constructor<int>()

        .function( "reset", &MultiwayAligningTransform::reset )

        .function( "add", select_overload<void( const MultiwayAligningTransform & )>( &MultiwayAligningTransform::add ))
        .function( "add3DLinkFromVector3f", select_overload<void( int, const Vector3f&, int, const Vector3f&, float )>( &MultiwayAligningTransform::add ))
        .function( "add3DLinkFromVector3d", select_overload<void( int, const Vector3d&, int, const Vector3d&, double )>( &MultiwayAligningTransform::add ))

        .function( "add1DLinkFromVector3d", select_overload<void( int, const Vector3d&, int, const Vector3d&, const Vector3d&, double )>( &MultiwayAligningTransform::add ))
        .function( "add1DLinkFromVector3f", select_overload<void( int, const Vector3f&, int, const Vector3f&, const Vector3f&, float )>( &MultiwayAligningTransform::add ))

        .function( "solve", select_overload<std::vector<RigidXf3d>() const>( &MultiwayAligningTransform::solve ) )
        .function( "solveWithStabilizer", select_overload<std::vector<RigidXf3d>( const MultiwayAligningTransform::Stabilizer& ) const>( &MultiwayAligningTransform::solve ) );
}
