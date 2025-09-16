#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRQuaternion.h>

#include "MRQuaternion.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( QuadraticFormModule )
{
    MRJS::bindTypedQuaternion<Quaternionf, Vector3f, Matrix3f, float>( "Quaternionf" );
    MRJS::bindTypedQuaternion<Quaterniond, Vector3d, Matrix3d, double>( "Quaterniond" );

    MRJS::bindQuaternionGlobalFunctions<Quaternionf, float>( "f" );
    MRJS::bindQuaternionGlobalFunctions<Quaterniond, double>( "d" );


    // Bind Quaternion operators
    function( "addQuaternionf", select_overload<Quaternionf( const Quaternionf&, const Quaternionf& )>( &operator+<float> ) );
    function( "addQuaterniond", select_overload<Quaterniond( const Quaterniond&, const Quaterniond& )>( &operator+<double> ) );
    function( "subQuaternionf", select_overload<Quaternionf( const Quaternionf&, const Quaternionf& )>( &operator-<float> ) );
    function( "subQuaterniond", select_overload<Quaterniond( const Quaterniond&, const Quaterniond& )>( &operator-<double> ) );
    function( "mulQuaternionf", select_overload<Quaternionf( const Quaternionf&, const Quaternionf& )>( &operator*<float> ) );
    function( "mulQuaterniond", select_overload<Quaterniond( const Quaterniond&, const Quaterniond& )>( &operator*<double> ) );
    function( "mulScalarQuaternionf", select_overload<Quaternionf( float, const Quaternionf& )>( &operator*<float> ) );
    function( "mulScalarQuaterniond", select_overload<Quaterniond( double, const Quaterniond& )>( &operator*<double> ) );
    function( "divQuaternionf", select_overload<Quaternionf( const Quaternionf&, float )>( &operator/<float> ) );
    function( "divQuaterniond", select_overload<Quaterniond( const Quaterniond&, double )>( &operator/<double> ) );

    // Bind comparison operators
    function( "eqQuaternionf", select_overload<bool( const Quaternionf&, const Quaternionf& )>( &operator==<float> ) );
    function( "eqQuaterniond", select_overload<bool( const Quaterniond&, const Quaterniond& )>( &operator==<double> ) );
    function( "neqQuaternionf", select_overload<bool( const Quaternionf&, const Quaternionf& )>( &operator!=<float> ) );
    function( "neqQuaterniond", select_overload<bool( const Quaterniond&, const Quaterniond& )>( &operator!=<double> ) );
}
