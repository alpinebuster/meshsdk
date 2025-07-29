#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshNormals.h>
#include <MRMesh/MRAligningTransform.h>
#include <MRMesh/MRBestFit.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRMeshOrPoints.h>
#include <MRMesh/MRPointToPlaneAligningTransform.h>
#include <MRMesh/MRICP.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( ICPModule ) { 
    class_<ICPPairData>( "ICPPairData" )
        .constructor<>()
        .property( "srcPoint_", &ICPPairData::srcPoint )
        .property( "srcNorm_", &ICPPairData::srcNorm )
        .property( "tgtPoint_", &ICPPairData::tgtPoint )
        .property( "tgtNorm_", &ICPPairData::tgtNorm )
        .property( "distSq_", &ICPPairData::distSq )
        .property( "weight_", &ICPPairData::weight )
        
		.function( "equals_", optional_override( [] ( const ICPPairData& self, const ICPPairData& other )
		{
			return self == other;
        } ) );

    class_<PointPair, base<ICPPairData>>( "PointPair" )
        .constructor<>()
        .property( "srcVertId", &PointPair::srcVertId )
        .property( "tgtCloseVert", &PointPair::tgtCloseVert )
        .property( "normalsAngleCos", &PointPair::normalsAngleCos )
        .property( "tgtOnBd", &PointPair::tgtOnBd )
        
		.function( "equals", optional_override( [] ( const PointPair& self, const PointPair& other )
		{
			return self == other;
        } ) );


    class_<IPointPairs>( "IPointPairs" )
        // NOTE: abstract classes can't have constructors
        // .constructor<>()
        // .constructor<const IPointPairs&>()

        .function( "getActive_", optional_override( []( const IPointPairs& self ) -> const BitSet& { return self.active; } ) )
        .function( "setActive_", optional_override( []( IPointPairs& self, const BitSet& value ) { self.active = value; } ) )

        .function( "size_", &IPointPairs::size );

    class_<PointPairs, base<IPointPairs>>( "PointPairs" )
        .constructor<>()
        .constructor<const PointPairs&>()
        .property( "vec", &PointPairs::vec )

        .function( "getActive", optional_override( []( const PointPairs& self ) -> const BitSet& { return self.active; } ) )
        .function( "setActive", optional_override( []( PointPairs& self, const BitSet& value ) { self.active = value; } ) )
        
        .function( "get", optional_override( [] ( PointPairs &self, size_t idx )
		{
			return self.vec[idx];
        } ) )
        .function( "size", &PointPairs::size );


    class_<NumSum>( "NumSum" )
        .constructor<>()
        .property( "num", &NumSum::num )
        .property( "sum", &NumSum::sum )

        .function( "opadd", optional_override( [] ( const NumSum& a, const NumSum& b )
		{
			return NumSum{ a.num + b.num, a.sum + b.sum };
        } ) )
        .function( "rootMeanSqF", &NumSum::rootMeanSqF );


    value_object<ICPProperties>( "ICPProperties" )
        .field( "method", &ICPProperties::method )
        .field( "p2plAngleLimit", &ICPProperties::p2plAngleLimit )
        .field( "p2plScaleLimit", &ICPProperties::p2plScaleLimit )
        .field( "cosThreshold", &ICPProperties::cosThreshold )
        .field( "distThresholdSq", &ICPProperties::distThresholdSq )
        .field( "farDistFactor", &ICPProperties::farDistFactor )
        .field( "icpMode", &ICPProperties::icpMode )
        .field( "fixedRotationAxis", &ICPProperties::fixedRotationAxis )
        .field( "iterLimit", &ICPProperties::iterLimit )
        .field( "badIterStopCount", &ICPProperties::badIterStopCount )
        .field( "exitVal", &ICPProperties::exitVal )
        .field( "mutualClosest", &ICPProperties::mutualClosest );


    class_<ICP>( "ICP" )
        .constructor<const MeshOrPoints&, const MeshOrPoints&, const AffineXf3f&, const AffineXf3f&, const VertBitSet&, const VertBitSet&>()
        .constructor<const MeshOrPointsXf&, const MeshOrPointsXf&, const VertBitSet&, const VertBitSet&>()
        .constructor<const MeshOrPoints&, const MeshOrPoints&, const AffineXf3f&, const AffineXf3f&, float>()
        .constructor<const MeshOrPointsXf&, const MeshOrPointsXf&, float>()

        .function( "setParams", &ICP::setParams )
        .function( "setCosineLimit", &ICP::setCosineLimit )
        .function( "setDistanceLimit", &ICP::setDistanceLimit )
        .function( "setBadIterCount", &ICP::setBadIterCount )
        .function( "setFarDistFactor", &ICP::setFarDistFactor )
        .function( "setFltSamples", &ICP::setFltSamples )
        .function( "sampleFltPoints", &ICP::sampleFltPoints )
        .function( "setRefSamples", &ICP::setRefSamples )
        .function( "sampleRefPoints", &ICP::sampleRefPoints )
        .function( "samplePoints", &ICP::samplePoints )
        .function( "setXfs", &ICP::setXfs )
        .function( "setFloatXf", &ICP::setFloatXf )
        .function( "autoSelectFloatXf", &ICP::autoSelectFloatXf )
        .function( "updatePointPairs", &ICP::updatePointPairs )
        .function( "getParams", &ICP::getParams )
        .function( "getStatusInfo", &ICP::getStatusInfo )
        .function( "getNumSamples", &ICP::getNumSamples )
        .function( "getNumActivePairs", &ICP::getNumActivePairs )
        .function( "getMeanSqDistToPoint", &ICP::getMeanSqDistToPoint )
        .function( "getMeanSqDistToPlane", &ICP::getMeanSqDistToPlane )
        .function( "getFlt2RefPairs", &ICP::getFlt2RefPairs )
        .function( "getRef2FltPairs", &ICP::getRef2FltPairs )
        .function( "calculateTransformation", &ICP::calculateTransformation );

        
    function( "getNumSamples", &getNumSamples );
    function( "getNumActivePairs", &getNumActivePairs );

    function( "getSumSqDistToPoint", select_overload<NumSum( const IPointPairs&, std::optional<double> )>( &getSumSqDistToPoint ) );
    function( "getSumSqDistToPlane", select_overload<NumSum( const IPointPairs&, std::optional<double> )>( &getSumSqDistToPlane ) );
    function( "getMeanSqDistToPoint", &getMeanSqDistToPoint );
    function( "getMeanSqDistToPlane", &getMeanSqDistToPlane );
    function( "getICPStatusInfo", &getICPStatusInfo );
    function( "getAligningXf", &getAligningXf );

    function( "deactivateFarPairs", &deactivateFarPairs );
    function( "updatePointPairs", &updatePointPairs );
}
