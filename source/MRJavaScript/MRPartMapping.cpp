#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMapOrHashMap.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRPartMapping.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( PartMappingModule )
{
    class_<PartMapping>( "PartMapping" )
        .constructor<>()

		.property( "src2tgtFaces", &PartMapping::src2tgtFaces, allow_raw_pointers() )
		.property( "src2tgtVerts", &PartMapping::src2tgtVerts, allow_raw_pointers() )
		.property( "src2tgtEdges", &PartMapping::src2tgtEdges, allow_raw_pointers() )
        
		.property( "tgt2srcFaces", &PartMapping::tgt2srcFaces, allow_raw_pointers() )
		.property( "tgt2srcVerts", &PartMapping::tgt2srcVerts, allow_raw_pointers() )
		.property( "tgt2srcEdges", &PartMapping::tgt2srcEdges, allow_raw_pointers() )

        .function( "clear", &PartMapping::clear );
}
