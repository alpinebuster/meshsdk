#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRQuaternion.h>

using namespace emscripten;
using namespace MR;


namespace MRJS {

template<typename Q, typename V3, typename M3, typename T>
void bindTypedQuaternion( const char* name )
{
    class_<Q>( name )
        .constructor<>()
        .constructor<T, T, T, T>()
        .constructor<const V3&, T>() // axis, angle constructor
        .constructor<T, const V3&>() // real, imaginary constructor
        .constructor<const M3&>() // matrix constructor
        .constructor<const V3&, const V3&>() // from-to vector constructor

        .property( "a", &Q::a ) // real part
        .property( "b", &Q::b ) // i component
        .property( "c", &Q::c ) // j component  
        .property( "d", &Q::d ) // k component

        .function( "im", &Q::im )
        .function( "angle", &Q::angle )
        .function( "axis", &Q::axis )
        .function( "normSq", &Q::normSq )
        .function( "norm", &Q::norm )
        .function( "normalize", &Q::normalize )
        .function( "normalized", &Q::normalized )
        .function( "conjugate", &Q::conjugate )
        .function( "inverse", &Q::inverse )
        .function( "call", &Q::operator() ) // rotate vector

        // Static methods
        .class_function( "lerp", &Q::lerp )
        .class_function( "slerp", select_overload<Q( Q, Q, T )>( &Q::slerp ) )
        .class_function( "slerpMatrix", select_overload<M3( const M3&, const M3&, T )>( &Q::slerp ) );
}

template<typename Q, typename T>
void bindQuaternionGlobalFunctions( const char* suffix )
{
    std::string dotName = std::string( "dotQuaternion_" ) + suffix;
    std::string getCanonicalName = std::string( "getCanonicalQuaternions_" ) + suffix;
    std::string getClosestCanonicalQuatName = std::string( "getClosestCanonicalQuaternion_" ) + suffix;
    std::string getClosestCanonicalMatName = std::string( "getClosestCanonicalMatrix_" ) + suffix;
    std::string slerpName = std::string( "slerp_" ) + suffix;
    std::string slerpMatName = std::string( "slerpMatrix_" ) + suffix;
    std::string orthonormalizedName = std::string( "orthonormalized_" ) + suffix;
    std::string orthonormalizedMatName = std::string( "orthonormalizedMatrix_" ) + suffix;

    function( dotName.c_str(), select_overload<T( const Quaternion<T> &, const Quaternion<T> & )>( &dot<T> ) );
    function( getCanonicalName.c_str(), &getCanonicalQuaternions<T>, allow_raw_pointers() );

    function( getClosestCanonicalQuatName.c_str(), &getClosestCanonicalQuaternion<T> );
    function( getClosestCanonicalMatName.c_str(), &getClosestCanonicalMatrix<T> );

    function( slerpName.c_str(), select_overload<AffineXf3<T>( const AffineXf3<T> &, const AffineXf3<T> &, T, const Vector3<T> & )>( &slerp<T> ) );
    function( slerpMatName.c_str(), select_overload<Matrix3<T>( const Matrix3<T> &, const Matrix3<T> &, T )>( &slerp<T> ) );

    function( orthonormalizedName.c_str(), select_overload<AffineXf3<T>( const AffineXf3<T> &, const Vector3<T> & )>( &orthonormalized<T> ) );
    function( orthonormalizedMatName.c_str(), select_overload<Matrix3<T>( const Matrix3<T>& )>( &orthonormalized<T> ) );
}

}
