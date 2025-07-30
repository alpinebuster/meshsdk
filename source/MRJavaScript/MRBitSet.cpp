#include <MRPch/MRWasm.h>

#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMultiwayICP.h>
#include <MRMesh/MRBitSet.h>

#include "MRBitSet.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( __internalBoostDynamicBitsetModule )
{
    using BoostDynamicBitset = boost::dynamic_bitset<std::uint64_t>;

    class_<BoostDynamicBitset>("__InternalDynamicBitset")
        .constructor<>()
        .constructor<size_t>() // Optional, for bypass construction checks only
        .constructor<size_t, bool>();
}


// `BitSet` base class bindings
EMSCRIPTEN_BINDINGS( BitSetModule )
{
    // NOTE:
    // 
    // Interface 'FaceBitSet' incorrectly extends interface 'BitSet'.
    // Types of property 'test' are incompatible.
    //     Type '(_0: FaceId) => boolean' is not assignable to type '(_0: number) => boolean'.
    //     Types of parameters '_0' and '_0' are incompatible.
    //         Type 'number' is not assignable to type 'FaceId'.ts(2430)
    // 
    // class_<FaceBitSet, base<BitSet>>( "FaceBitSet" )
    // 
    class_<BitSet>( "BitSet" )
        .smart_ptr<std::shared_ptr<BitSet>>( "BitSetSharedPtr" )
        
        .constructor<>()
        .constructor<size_t>()
        .constructor<size_t, bool>()
        .class_function( "createFromValue_", optional_override( [] ( size_t numBits, bool fillValue )
        {
            return BitSet( numBits, fillValue );
        } ) )

        // Basic operations
        .function( "size_", &BitSet::size )
        .function( "count_", &BitSet::count )
        .function( "empty_", &BitSet::empty )
        .function( "clear_", &BitSet::clear )

        // Bit operations
        .function( "test_", &BitSet::test )
        .function( "set_", select_overload<BitSet & ( size_t, bool )>( &BitSet::set ) )
        .function( "setAll_", select_overload<BitSet & ( )>( &BitSet::set ) )
        .function( "setRange_", select_overload<BitSet & ( size_t, size_t, bool )>( &BitSet::set ) )
        .function( "reset_", select_overload<BitSet & ( size_t )>( &BitSet::reset ) )
        .function( "resetAll_", select_overload<BitSet & ( )>( &BitSet::reset ) )
        .function( "resetRange_", select_overload<BitSet & ( size_t, size_t )>( &BitSet::reset ) )
        .function( "flip_", select_overload<BitSet & ( size_t )>( &BitSet::flip ) )
        .function( "flipAll_", select_overload<BitSet & ( )>( &BitSet::flip ) )

        // Search operations
        .function( "find_first_", &BitSet::find_first )
        .function( "find_next_", &BitSet::find_next )
        .function( "find_last_", &BitSet::find_last )
        .function( "nthSetBit_", &BitSet::nthSetBit )

        // Collection operations
        .function( "bitwiseAndAssign_", select_overload<BitSet & ( const BitSet& )>( &BitSet::operator&= ), return_value_policy::reference() )
        .function( "bitwiseOrAssign_", select_overload<BitSet & ( const BitSet& )>( &BitSet::operator|= ), return_value_policy::reference() )
        .function( "bitwiseXorAssign_", select_overload<BitSet & ( const BitSet& )>( &BitSet::operator^= ), return_value_policy::reference() )
        .function( "subtractAssign_", select_overload<BitSet & ( const BitSet& )>( &BitSet::operator-= ), return_value_policy::reference() )
        .function( "subtract_", select_overload<BitSet & ( const BitSet&, int )>( &BitSet::subtract ), return_value_policy::reference() )

        // Automatic resize operation
        .function( "autoResizeSet_", select_overload<void( size_t, bool )>( &BitSet::autoResizeSet ) )
        .function( "autoResizeSetRange_", select_overload<void( size_t, size_t, bool )>( &BitSet::autoResizeSet ) )
        .function( "autoResizeTestSet_", &BitSet::autoResizeTestSet )

        // Memory related
        .function( "heapBytes_", &BitSet::heapBytes )
        .function( "resize_", &BitSet::resize )
        .function( "resizeWithReserve_", &BitSet::resizeWithReserve )
        .function( "push_back_", &BitSet::push_back )
        .function( "pop_back_", &BitSet::pop_back )

        // ID range
        .function( "backId_", &BitSet::backId )
        .function( "endId_", &BitSet::endId )
        .class_function( "beginId_", &BitSet::beginId );
}


EMSCRIPTEN_BINDINGS( TypedBitSetModule )
{
    bindTypedBitSet<FaceBitSet>( "FaceBitSet" );
    bindTypedBitSet<VertBitSet>( "VertBitSet" );
    bindTypedBitSet<EdgeBitSet>( "EdgeBitSet" );
    bindTypedBitSet<UndirectedEdgeBitSet>( "UndirectedEdgeBitSet" );
    bindTypedBitSet<PixelBitSet>( "PixelBitSet" );
    bindTypedBitSet<VoxelBitSet>( "VoxelBitSet" );
    bindTypedBitSet<RegionBitSet>( "RegionBitSet" );
    bindTypedBitSet<NodeBitSet>( "NodeBitSet" );
    bindTypedBitSet<ObjBitSet>( "ObjBitSet" );
    bindTypedBitSet<TextureBitSet>( "TextureBitSet" );
    bindTypedBitSet<GraphVertBitSet>( "GraphVertBitSet" );
    bindTypedBitSet<GraphEdgeBitSet>( "GraphEdgeBitSet" );
    
    bindTypedBitSet<ICPElementBitSet>( "ICPElementBitSet" );
}


// To support operator overloading in JavaScript, add global functions
EMSCRIPTEN_BINDINGS( BitSetOperatorsModule )
{
    function( "faceBitSetAnd", +[] ( const FaceBitSet& a, const FaceBitSet& b )
    {
        return a & b;
    } );
    function( "faceBitSetOr", +[] ( const FaceBitSet& a, const FaceBitSet& b )
    {
        return a | b;
    } );
    function( "faceBitSetXor", +[] ( const FaceBitSet& a, const FaceBitSet& b )
    {
        return a ^ b;
    } );
    function( "faceBitSetSub", +[] ( const FaceBitSet& a, const FaceBitSet& b )
    {
        return a - b;
    } );
}
