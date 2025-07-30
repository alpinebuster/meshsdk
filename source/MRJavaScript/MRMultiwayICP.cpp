#include <algorithm>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRPointToPointAligningTransform.h>
#include <MRMesh/MRPointToPlaneAligningTransform.h>
#include <MRMesh/MRMultiwayAligningTransform.h>
#include <MRMesh/MRAABBTreeObjects.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRICP.h>
#include <MRMesh/MRMultiwayICP.h>

using namespace emscripten;
using namespace MR;


struct IICPTreeIndexerWrapper : public wrapper<IICPTreeIndexer> {
    EMSCRIPTEN_WRAPPER( IICPTreeIndexerWrapper );

    bool fromSameNode( ICPLayer l, ICPElementId eI, ICPElementId eJ ) const override
    {
        return call<bool>( "fromSameNode", l, eI, eJ );
    }

    ObjBitSet getElementLeaves( ICPLayer l, ICPElementId eId ) const override
    {
        return call<ObjBitSet>( "getElementLeaves", l, eId );
    }

    ICPElementBitSet getElementNodes( ICPLayer l, ICPElementId eId ) const override
    {
        return call<ICPElementBitSet>( "getElementNodes", l, eId );
    }

    size_t getNumElements( ICPLayer l ) const override
    {
        return call<size_t>( "getNumElements", l );
    }

    size_t getNumLayers() const override
    {
        return call<size_t>( "getNumLayers" );
    }
};


EMSCRIPTEN_BINDINGS( MultiwayICPModule )
{
    class_<ICPGroupPair, base<ICPPairData>>( "ICPGroupPair" )
        .property( "srcId_", &ICPGroupPair::srcId )
        .property( "tgtClosestId_", &ICPGroupPair::tgtClosestId );

    class_<ICPGroupPairs, base<IPointPairs>>( "ICPGroupPairs" )
        .property( "vec_", &ICPGroupPairs::vec )
        .function( "getVecConst_", optional_override( []( const ICPGroupPairs& self, size_t idx ) -> const ICPGroupPair& { return self.vec[idx]; } ) )
        .function( "getVec_", optional_override( []( ICPGroupPairs& self, size_t idx ) ->  ICPGroupPair& { return self.vec[idx]; } ) )
        .function( "size_", &ICPGroupPairs::size );


    function( "updateGroupPairs", &updateGroupPairs );


    class_<IICPTreeIndexer>( "IICPTreeIndexer" )
        .allow_subclass<IICPTreeIndexerWrapper>( "IICPTreeIndexerWrapper" )

        .function( "fromSameNode", &IICPTreeIndexer::fromSameNode, pure_virtual() )
        .function( "getElementLeaves", &IICPTreeIndexer::getElementLeaves, pure_virtual() )
        .function( "getElementNodes", &IICPTreeIndexer::getElementNodes, pure_virtual() )
        .function( "getNumElements", &IICPTreeIndexer::getNumElements, pure_virtual() )
        .function( "getNumLayers", &IICPTreeIndexer::getNumLayers, pure_virtual() );


    enum_<MultiwayICPSamplingParameters::CascadeMode>( "MultiwayICPSamplingParametersCascadeMode" )
        .value( "Sequential", MultiwayICPSamplingParameters::CascadeMode::Sequential )
        .value( "AABBTreeBased", MultiwayICPSamplingParameters::CascadeMode::AABBTreeBased );

    value_object<MultiwayICPSamplingParameters>( "MultiwayICPSamplingParameters" )
        .field( "samplingVoxelSize", &MultiwayICPSamplingParameters::samplingVoxelSize )
        .field( "maxGroupSize", &MultiwayICPSamplingParameters::maxGroupSize )
        .field( "cascadeMode", &MultiwayICPSamplingParameters::cascadeMode )
        .field( "cb", &MultiwayICPSamplingParameters::cb );


    class_<MultiwayICP>( "MultiwayICP" )
        .constructor<const ICPObjects&, const MultiwayICPSamplingParameters&>()

        .function( "calculateTransformations", select_overload<Vector<AffineXf3f, ObjId>( ProgressCallback )>( &MultiwayICP::calculateTransformations ) )
        .function( "calculateTransformationsFixFirst", select_overload<Vector<AffineXf3f, ObjId>( ProgressCallback )>( &MultiwayICP::calculateTransformationsFixFirst ) )
        .function( "resamplePoints", &MultiwayICP::resamplePoints )
        .function( "updateAllPointPairs", select_overload<bool( ProgressCallback )>( &MultiwayICP::updateAllPointPairs ) )

        .function( "setParams", &MultiwayICP::setParams )
        .function( "getParams", &MultiwayICP::getParams )

        .function( "getMeanSqDistToPoint", select_overload<float( std::optional<double> ) const>( &MultiwayICP::getMeanSqDistToPoint ) )
        .function( "getMeanSqDistToPlane", select_overload<float( std::optional<double> ) const>( &MultiwayICP::getMeanSqDistToPlane ) )
        .function( "getNumSamples", &MultiwayICP::getNumSamples )
        .function( "getNumActivePairs", &MultiwayICP::getNumActivePairs )

        .function( "setPerIterationCallback", &MultiwayICP::setPerIterationCallback )

        .function( "devIndependentEquationsModeEnabled", &MultiwayICP::devIndependentEquationsModeEnabled )
        .function( "devEnableIndependentEquationsMode", &MultiwayICP::devEnableIndependentEquationsMode )

        .function( "getStatusInfo", &MultiwayICP::getStatusInfo )

        .function( "getPairsPerLayer", &MultiwayICP::getPairsPerLayer )
        .function( "getCascadeIndexer", &MultiwayICP::getCascadeIndexer, allow_raw_pointers() );
}
