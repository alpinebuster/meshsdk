#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshPart.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRMapEdge.h>
#include <MRMesh/MRMeshDecimate.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRMeshCollide.h>
#include <MRMesh/MRProgressCallback.h>

#include <MRVoxels/MRRebuildMesh.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( RebuildMeshModule )
{
    class_<RebuildMeshSettings>( "RebuildMeshSettings" )
        .constructor<>()
        .property( "preSubdivide", &RebuildMeshSettings::preSubdivide )
        .property( "voxelSize", &RebuildMeshSettings::voxelSize )
        .property( "signMode", &RebuildMeshSettings::signMode )
        .property( "closeHolesInHoleWindingNumber", &RebuildMeshSettings::closeHolesInHoleWindingNumber )
        .property( "offsetMode", &RebuildMeshSettings::offsetMode )
        .property( "outSharpEdges", &RebuildMeshSettings::outSharpEdges, allow_raw_pointers() )
        .property( "windingNumberThreshold", &RebuildMeshSettings::windingNumberThreshold )
        .property( "windingNumberBeta", &RebuildMeshSettings::windingNumberBeta )
        // .property( "fwn", &RebuildMeshSettings::fwn )
        .property( "decimate", &RebuildMeshSettings::decimate )
        .property( "tinyEdgeLength", &RebuildMeshSettings::tinyEdgeLength )
        .property( "progress", &RebuildMeshSettings::progress )
        .property( "onSignDetectionModeSelected", &RebuildMeshSettings::onSignDetectionModeSelected ); 


    function( "rebuildMesh", &rebuildMesh );
}
