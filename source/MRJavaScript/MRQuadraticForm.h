#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRSymMatrix2.h>
#include <MRMesh/MRSymMatrix3.h>
#include <MRMesh/MRQuadraticForm.h>

using namespace emscripten;
using namespace MR;


namespace MRJS
{

template<typename QF, typename V, typename T>
void bindTypedQuadraticForm( const char* name )
{
    class_<QF>( name )
        .constructor<>()
        .property( "A", &QF::A )
        .property( "c", &QF::c )
        .function( "eval", &QF::eval )
        .function( "addDistToOrigin", select_overload<void( T )>( &QF::addDistToOrigin ) )
        .function( "addDistToPlane", select_overload<void( const V& )>( &QF::addDistToPlane ) )
        .function( "addDistToPlaneWeighted", select_overload<void( const V&, T )>( &QF::addDistToPlane ) )
        .function( "addDistToLine", select_overload<void( const V& )>( &QF::addDistToLine ) )
        .function( "addDistToLineWeighted", select_overload<void( const V&, T )>( &QF::addDistToLine ) );
}

template<typename V>
void bindSumFunctions( const char* suffix )
{
    std::string sumName = std::string( "sum_" ) + suffix;
    std::string sumAtName = std::string( "sumAt_" ) + suffix;

    function( sumName.c_str(), &sum<V> );
    function( sumAtName.c_str(), &sumAt<V> );
}

}
