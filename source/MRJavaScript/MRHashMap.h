#include <optional>
#include <memory>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshExtrude.h>
#include <MRMesh/MRBox.h>

using namespace emscripten;
using namespace MR;

namespace MRJS
{

template <typename IdType>
void bindRawHashTypes(const std::string& suffix) {
    using Key = IdType;
    using Value = IdType;

    using Hash = phmap::priv::hash_default_hash<Key>;
    using Eq = phmap::priv::hash_default_eq<Key>;

    using Policy = phmap::priv::FlatHashMapPolicy<Key, Value>;
    using RawHashSet = phmap::priv::raw_hash_set<
        Policy, Hash, Eq, std::allocator<std::pair<const Key, Value>>
    >;
    using RawHashMap = phmap::priv::raw_hash_map<
        Policy, Hash, Eq, std::allocator<std::pair<const Key, Value>>
    >;

    class_<Policy>( ( "__phmap_internal_FlatHashMapPolicy_" + suffix ).c_str() );
    class_<RawHashSet>( ( "__phmap_internal_raw_hash_set_" + suffix ).c_str() );
    class_<RawHashMap>( ( "__phmap_internal_raw_hash_map_" + suffix ).c_str() );
}

template<typename MapType, typename KeyType, typename ValueType>
auto bindTypedHashMap(const std::string& CLS_NAME, const std::string& SHARED_PTR_NAME) {
	auto cls = class_<MapType>( CLS_NAME.c_str() )
		.constructor<>()
		.template smart_ptr<std::shared_ptr<MapType>>( SHARED_PTR_NAME.c_str() )

		.function( "size", &MapType::size )
		.function( "insert", optional_override( [] ( MapType& self, const KeyType& key, const ValueType& value )
		{
			self.insert( { key, value } );
		} ) )
		.function( "get", optional_override( [] ( const MapType& self, const KeyType& key ) -> val
		{
			auto it = self.find( key );
			if ( it != self.end() )
			{
				return val( it->second );
			}
			else
			{
				return val::undefined();
			}
		} ) )
		.function( "has", optional_override( [] ( const MapType& self, const KeyType& key ) -> bool
		{
			return self.find( key ) != self.end();
		} ) )
		.function( "erase", optional_override( [] ( MapType& self, const KeyType& key )
		{
			self.erase( key );
		} ) )
		.function( "clear", &MapType::clear )
		.function( "keys", optional_override( [] ( const MapType& self ) -> std::vector<KeyType>
		{
			std::vector<KeyType> keys;
			for ( const auto& pair : self )
			{
				keys.push_back( pair.first );
			}
			return keys;
		} ) )
		.function( "values", optional_override( [] ( const MapType& self ) -> std::vector<ValueType>
		{
			std::vector<ValueType> values;
			for ( const auto& pair : self )
			{
				values.push_back( pair.second );
			}
			return values;
		} ) );

	return cls;
}

} // namespace MRJS
