#include <vector>
#include <limits>
#include <cmath>
#include <algorithm>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRBox.h>

using namespace emscripten;
using namespace MR;

namespace MRJS
{

template<typename BoxType, typename Type>
auto bindTypedBox( const std::string& name ) {
    auto cls = class_<BoxType>( name.c_str() )
        .constructor<>()
        .template constructor<const Type&, const Type&>()
		.class_function( "fromMinAndSize", &BoxType::fromMinAndSize )
		.class_function( "getMinBoxCorner", &BoxType::getMinBoxCorner )
		.class_function( "getMaxBoxCorner", &BoxType::getMaxBoxCorner )

		.property( "min", &BoxType::min )
		.property( "max", &BoxType::max )

		.function( "valid", &BoxType::valid )
		.function( "center", &BoxType::center )
		.function( "corner", &BoxType::corner )
		.function( "size", &BoxType::size )
		.function( "diagonal", &BoxType::diagonal )
		.function( "volume", &BoxType::volume )
		.function( "include", select_overload<void( const Type& )>( &BoxType::include ) )
		.function( "includeBox", select_overload<void( const BoxType& )>( &BoxType::include ) )
		.function( "contains", select_overload<bool( const Type& ) const>( &BoxType::contains ) )
		.function( "containsBox", select_overload<bool( const BoxType& ) const>( &BoxType::contains ) )
		.function( "getBoxClosestPointTo", &BoxType::getBoxClosestPointTo )
		.function( "intersects", &BoxType::intersects )
		.function( "intersection", &BoxType::intersection )
		.function( "intersect", &BoxType::intersect, return_value_policy::reference() )
		.function( "getDistanceSqToBox", select_overload<typename BoxType::T( const BoxType& ) const>( &BoxType::getDistanceSq ) )
		.function( "getDistanceSqToPoint", select_overload<typename BoxType::T( const Type& ) const>( &BoxType::getDistanceSq ) )
		.function( "expanded", &BoxType::expanded )
		.function( "insignificantlyExpanded", &BoxType::insignificantlyExpanded );

	return cls;
}
	
} // namespace MRJS

