#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshDistance.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRMeshPart.h>
#include <MRMesh/MROverlappingTris.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( OverlappingTrisModule )
{
    class_<FindOverlappingSettings>( "FindOverlappingSettings" )
        .constructor<>()
        .property( "maxDistSq", &FindOverlappingSettings::maxDistSq )
        .property( "maxNormalDot", &FindOverlappingSettings::maxNormalDot )
        .property( "minAreaFraction", &FindOverlappingSettings::minAreaFraction )
        .property( "cb", &FindOverlappingSettings::cb );


    // NOTE: find overlapping faces and use `mesh.deleteFaces` to remove them
    function("findOverlappingTris", &findOverlappingTris);
}

