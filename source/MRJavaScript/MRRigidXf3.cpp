#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRMatrix3.h>
#include <MRMesh/MRQuaternion.h>
#include <MRMesh/MRRigidXf3.h>

#include "MRRigidXf3.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( RigidXf3Module )
{
    MRJS::bindRigidXf3<float>( "RigidXf3f" );
    MRJS::bindRigidXf3<double>( "RigidXf3d" );
}
