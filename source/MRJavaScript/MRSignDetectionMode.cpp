#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRSignDetectionMode.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( SignDetectionModeModule )
{
    enum_<SignDetectionMode>( "SignDetectionMode" )
        .value( "Unsigned", SignDetectionMode::Unsigned )
        .value( "OpenVDB", SignDetectionMode::OpenVDB )
        .value( "ProjectionNormal", SignDetectionMode::ProjectionNormal )
        .value( "WindingRule", SignDetectionMode::WindingRule )
        .value( "HoleWindingRule", SignDetectionMode::HoleWindingRule );

        
    enum_<SignDetectionModeShort>( "SignDetectionModeShort" )
        .value( "Auto", SignDetectionModeShort::Auto )
        .value( "HoleWindingNumber", SignDetectionModeShort::HoleWindingNumber )
        .value( "ProjectionNormal", SignDetectionModeShort::ProjectionNormal );
}