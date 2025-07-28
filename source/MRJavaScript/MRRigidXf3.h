#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRMatrix3.h>
#include <MRMesh/MRQuaternion.h>
#include <MRMesh/MRRigidXf3.h>

using namespace emscripten;
using namespace MR;


namespace MRJS {

template<typename T>
auto bindRigidXf3( const char* className )
{
    auto cls = class_<RigidXf3<T>>( className )
        .constructor<>()
        .constructor<const Vector3<T>&, const Vector3<T>&>()

        .property("a", &RigidXf3<T>::a)
        .property("b", &RigidXf3<T>::b)
        
        .function("rigidXf", &RigidXf3<T>::rigidXf)
        .function("linearXf", &RigidXf3<T>::linearXf);

    return cls;
}

} // namespace MRJS
