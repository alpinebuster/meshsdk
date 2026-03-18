#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRFillHoleNicely.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRPositionVertsSmoothly.h>

#include "MRPositionVertsSmoothly.h"
#include "MRUtils.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( PositionVertsSmoothlyModule )
{
    class_<SpacingSettings>( "SpacingSettings" )
        .constructor<>()
        .property( "region", &SpacingSettings::region, allow_raw_pointers() )
        .property( "dist", &SpacingSettings::dist )
        .property( "numIters", &SpacingSettings::numIters )
        .property( "stabilizer", &SpacingSettings::stabilizer )
        .property( "maxSumNegW", &SpacingSettings::maxSumNegW )
        .property( "isInverted", &SpacingSettings::isInverted );

    value_object<InflateSettings>( "InflateSettings" )
        .field( "pressure", &InflateSettings::pressure )
        .field( "iterations", &InflateSettings::iterations )
        .field( "preSmooth", &InflateSettings::preSmooth )
        .field( "gradualPressureGrowth", &InflateSettings::gradualPressureGrowth );

    class_<PositionVertsSmoothlyParams>( "PositionVertsSmoothlyParams" )
        .constructor<>()
        .property( "region", &PositionVertsSmoothlyParams::region, allow_raw_pointers() )
        .property( "vertShifts", &PositionVertsSmoothlyParams::vertShifts, allow_raw_pointers() )
        .property( "stabilizer", &PositionVertsSmoothlyParams::stabilizer );


    ///
    function( "positionVertsSmoothly", select_overload<void( Mesh&, const VertBitSet&, EdgeWeights, VertexMass, const VertBitSet* )>( &positionVertsSmoothly ), allow_raw_pointers() );
    function( "positionVertsSmoothlyWithTopology", select_overload<void( const MeshTopology&, VertCoords&, const VertBitSet&, EdgeWeights, VertexMass, const VertBitSet* )>( &positionVertsSmoothly ), allow_raw_pointers() );

    function( "positionVertsSmoothlySharpBd", select_overload<void( Mesh&, const PositionVertsSmoothlyParams& )>( &positionVertsSmoothlySharpBd ) );
    function( "positionVertsSmoothlySharpBdWithTopology", select_overload<void( const MeshTopology&, VertCoords&, const PositionVertsSmoothlyParams& )>( &positionVertsSmoothlySharpBd ), allow_raw_pointers() );

    function( "positionVertsWithSpacing", select_overload<void( Mesh&, const SpacingSettings& )>( &positionVertsWithSpacing ) );
    function( "positionVertsWithSpacingWithTopology", select_overload<void( const MeshTopology&, VertCoords&, const SpacingSettings& )>( &positionVertsWithSpacing ) );

    function( "inflate", select_overload<void( Mesh&, const VertBitSet&, const InflateSettings& )>( &inflate ) );
    function( "inflateWithTopology", select_overload<void( const MeshTopology&, VertCoords&, const VertBitSet&, const InflateSettings& )>( &inflate ) );
    function( "inflate1WithTopology", select_overload<void( const MeshTopology&, VertCoords&, const VertBitSet&, float )>( &inflate1 ) );
    ///
}
