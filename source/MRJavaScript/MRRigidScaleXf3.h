#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRMatrix3.h>
#include <MRMesh/MRRigidXf3.h>
#include <MRMesh/MRRigidScaleXf3.h>

using namespace emscripten;
using namespace MR;


namespace MRJS {

template<typename T>
auto bindRigidScaleXf3( const char* className )
{
    auto cls = class_<RigidScaleXf3<T>>( className )
        .constructor<>()
        .constructor<const Vector3<T>&, const Vector3<T>&, T>()

        .property("a", &RigidScaleXf3<T>::a)
        .property("b", &RigidScaleXf3<T>::b)
        .property("s", &RigidScaleXf3<T>::s)
    
        .function("rigidScaleXf", &RigidScaleXf3<T>::rigidScaleXf)
        .function("linearXf", &RigidScaleXf3<T>::linearXf);

    return cls;
}

} // namespace MRJS
