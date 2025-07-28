#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRigidXf3.h>
#include <MRMesh/MRRigidScaleXf3.h>

#include "MRRigidScaleXf3.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( RigidScaleXf3Module )
{
    MRJS::bindRigidScaleXf3<float>( "RigidScaleXf3f" );
    MRJS::bindRigidScaleXf3<double>( "RigidScaleXf3d" );
}
