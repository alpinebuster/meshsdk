#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRMapOrHashMap.h>

#include "MRMapOrHashMap.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MapOrHashMapModule )
{
    MRJS::bindTypedMapOrHashMap<FaceId, FaceId>( "FaceMapOrHashMap" );
    MRJS::bindTypedMapOrHashMapGlobalFunctions<FaceId, FaceId>( "F" );

    MRJS::bindTypedMapOrHashMap<VertId, VertId>( "VertMapOrHashMap" );
    MRJS::bindTypedMapOrHashMapGlobalFunctions<VertId, VertId>( "V" );

    MRJS::bindTypedMapOrHashMap<EdgeId, EdgeId>( "EdgeMapOrHashMap" );
    MRJS::bindTypedMapOrHashMapGlobalFunctions<EdgeId, EdgeId>( "E" );

    MRJS::bindTypedMapOrHashMap<UndirectedEdgeId, UndirectedEdgeId>( "UndirectedEdgeMapOrHashMap" );
    MRJS::bindTypedMapOrHashMapGlobalFunctions<UndirectedEdgeId, UndirectedEdgeId>( "UE" );

    MRJS::bindTypedMapOrHashMap<UndirectedEdgeId, EdgeId>( "WholeEdgeMapOrHashMap" );
    MRJS::bindTypedMapOrHashMapGlobalFunctions<UndirectedEdgeId, EdgeId>( "WE" );
}

