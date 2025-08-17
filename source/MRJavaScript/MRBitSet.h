#pragma once

#include <type_traits>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBitSet.h>

using namespace emscripten;
using namespace MR;


// NOTE:
// 
// `.smart_ptr<std::shared_ptr<FaceBitSet>>()` will not work!
// 
// In embind, the `class_<T>` has two overloaded `.smart_ptr()` methods:
// 
// ✅ When there is no base class, use:
// 
// ```cpp
// .smart_ptr<std::shared_ptr<T>>()
// ```
// 
// ✅ When there is a base class, must provide the name of the smart pointer as a string:
// 
// ```cpp
// .smart_ptr<std::shared_ptr<T>>( "TSharedPtr" )
// ```
// 
template<typename BitSetType>
auto bindTypedBitSet( const std::string& className )
{
    auto cls = class_<BitSetType, base<BitSet>>( className.c_str() )
        .template smart_ptr<std::shared_ptr<BitSetType>>( ( className + "SharedPtr" ).c_str() )
        .template constructor<>()
        .template constructor<size_t>()
        .template constructor<size_t, bool>()

        .class_function( "createFromSize", optional_override( [] ( size_t numBits )
        {
            return BitSetType( numBits );
        } ) )
        .class_function( "createFromValue", optional_override( [] ( size_t numBits, bool fillValue )
        {
            return BitSetType( numBits, fillValue );
        } ) )
        .class_function( "createFromBitSet", optional_override( [] ( const BitSetType& src )
        {
            return BitSetType( src );
		} ) )

		.function( "size", &BitSetType::size )
        .function( "count", &BitSetType::count )
        .function( "empty", &BitSetType::empty )
        .function( "clear", &BitSetType::clear )

        .function( "test", &BitSetType::test )
        .function( "testSet", &BitSetType::test_set )
        .function( "set", select_overload<BitSetType & ( typename BitSetType::IndexType, bool )>( &BitSetType::set ), return_value_policy::reference() )
        .function( "setAll", select_overload<BitSetType & ( )>( &BitSetType::set ), return_value_policy::reference() )
        .function( "setRange", select_overload<BitSetType & ( typename BitSetType::IndexType, typename BitSetType::size_type, bool )>( &BitSetType::set ), return_value_policy::reference() )
        .function( "reset", select_overload<BitSetType & ( typename BitSetType::IndexType )>( &BitSetType::reset ), return_value_policy::reference() )
        .function( "resetAll", select_overload<BitSetType & ( )>( &BitSetType::reset ), return_value_policy::reference() )
        .function( "resetRange", select_overload<BitSetType & ( typename BitSetType::IndexType, typename BitSetType::size_type )>( &BitSetType::reset ), return_value_policy::reference() )
        .function( "flip", select_overload<BitSetType & ( typename BitSetType::IndexType )>( &BitSetType::flip ), return_value_policy::reference() )
        .function( "flipAll", select_overload<BitSetType & ( )>( &BitSetType::flip ), return_value_policy::reference() )

        .function( "findFirst", &BitSetType::find_first )
        .function( "findNext", &BitSetType::find_next )
        .function( "findLast", &BitSetType::find_last )
        .function( "nthSetBit", &BitSetType::nthSetBit )

        .function( "bitwiseAndAssign", select_overload<BitSetType & ( const BitSetType& )>( &BitSetType::operator&= ), return_value_policy::reference() )
        .function( "bitwiseOrAssign", select_overload<BitSetType & ( const BitSetType& )>( &BitSetType::operator|= ), return_value_policy::reference() )
        .function( "bitwiseXorAssign", select_overload<BitSetType & ( const BitSetType& )>( &BitSetType::operator^= ), return_value_policy::reference() )
        .function( "subtractAssign", select_overload<BitSetType & ( const BitSetType& )>( &BitSetType::operator-= ), return_value_policy::reference() )
        .function( "subtract", select_overload<BitSetType & ( const BitSetType&, int )>( &BitSetType::subtract ), return_value_policy::reference() )

        .function( "isSubsetOf", &BitSetType::is_subset_of )
        .function( "intersects", &BitSetType::intersects )

        .function( "autoResizeSet", select_overload<void( typename BitSetType::IndexType, bool )>( &BitSetType::autoResizeSet ) )
        .function( "autoResizeSetRange", select_overload<void( typename BitSetType::IndexType, typename BitSetType::size_type, bool )>( &BitSetType::autoResizeSet ) )
		.function( "autoResizeTestSet", &BitSetType::autoResizeTestSet )
		
		.function( "heapBytes", &BitSetType::heapBytes )
        .function( "resize", &BitSetType::resize )
        .function( "resizeWithReserve", &BitSetType::resizeWithReserve )
        .function( "push_back", &BitSetType::push_back )
        .function( "pop_back", &BitSetType::pop_back )

        .function( "backId", &BitSetType::backId )
        .function( "endId", &BitSetType::endId )
		.class_function( "beginId", &BitSetType::beginId );

	return cls;
}
