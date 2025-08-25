#include <MRPch/MRWasm.h>

#include <MRMesh/MRphmap.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRMapOrHashMap.h>

using namespace emscripten;
using namespace MR;


namespace MRJS
{

template<typename K, typename V>
auto bindTypedMapOrHashMap( const std::string& className )
{
    using MapType = MapOrHashMap<K, V>;
    using Dense = typename MapType::Dense;
    using Hash = typename MapType::Hash;

    auto cls = class_<MapType>( className.c_str() )
        .constructor<>()

        .class_function( "createMap", &MapType::createMap )
        .class_function( "createHashMap", &MapType::createHashMap )
        
        .function( "setMap", &MapType::setMap )
        .function( "setHashMap", &MapType::setHashMap )

        .function( "resizeReserve", &MapType::resizeReserve )
        .function( "pushBack", &MapType::pushBack )

        // The `forEach()` method requires special handling because it uses template parameters
        // Here is a simplified version that accepts a JavaScript callback function
        .function( "forEach", optional_override( [] ( const MapType& self, val jsCallback )
        {
            self.forEach( [jsCallback] ( K key, V val )
            {
                jsCallback( key, val );
            } );
        } ) )

        .function( "getMap", select_overload<Dense * ( )>( &MapType::getMap ), allow_raw_pointers() )
        .function( "getMapConst", select_overload<const Dense * ( ) const>( &MapType::getMap ), allow_raw_pointers() )
        .function( "getHashMap", select_overload<Hash * ( )>( &MapType::getHashMap ), allow_raw_pointers() )
        .function( "getHashMapConst", select_overload<const Hash * ( ) const>( &MapType::getHashMap ), allow_raw_pointers() )

        .function( "clear", &MapType::clear );

    return cls;
}

template<typename K, typename V>
void bindTypedMapOrHashMapGlobalFunctions( const std::string& suffix )
{
    using MapType = MapOrHashMap<K, V>;

    function( ( "getAt" + suffix ).c_str(), select_overload<V( const MapType&, K, V )>( &getAt<K, V> ) );
    function( ( "setAt" + suffix ).c_str(), select_overload<void( MapType&, K, V )>( &setAt<K, V> ) );
}

}
