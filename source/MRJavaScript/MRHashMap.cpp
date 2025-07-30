#include <optional>
#include <memory>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshExtrude.h>
#include <MRMesh/MRBox.h>

#include "MRHashMap.h"

using namespace emscripten;
using namespace MR;


/// NOTE: Used to prevent `__phmap` type BindingError (just to make Emscripten happy :))!!!
// TODO: optimize this
EMSCRIPTEN_BINDINGS( __phmapInternalModule ) {
    MRJS::bindRawHashTypes<EdgeId, EdgeId>( "EdgeId" );
    MRJS::bindRawHashTypes<UndirectedEdgeId, UndirectedEdgeId>( "UndirectedEdgeId" );
    MRJS::bindRawHashTypes<FaceId,FaceId>( "FaceId" );
    MRJS::bindRawHashTypes<VertId, VertId>( "VertId" );
    MRJS::bindRawHashTypes<PixelId, PixelId>( "PixelId" );
    MRJS::bindRawHashTypes<VoxelId, VoxelId>( "VoxelId" );
    MRJS::bindRawHashTypes<RegionId, RegionId>( "RegionId" );
    MRJS::bindRawHashTypes<NodeId, NodeId>( "NodeId" );
    MRJS::bindRawHashTypes<ObjId, ObjId>( "ObjId" );
    MRJS::bindRawHashTypes<TextureId, TextureId>( "TextureId" );
    MRJS::bindRawHashTypes<GraphVertId, GraphVertId>( "GraphVertId" );
    MRJS::bindRawHashTypes<GraphEdgeId, GraphEdgeId>( "GraphEdgeId" );
    
    MRJS::bindRawHashTypes<UndirectedEdgeId, EdgeId>( "UndirectedEdgeIdEdgeId" );
    MRJS::bindRawHashTypes<UndirectedEdgeId, int>( "UndirectedEdgeIdInt" );
    MRJS::bindRawHashTypes<int, Box3i>( "IntBox3i" );
}


EMSCRIPTEN_BINDINGS( HashMapModule )
{
    MRJS::bindTypedHashMap<VertHashMap, VertId, VertId>( "VertHashMap", "VertHashMapSharedPtr" );
    MRJS::bindTypedHashMap<FaceHashMap, FaceId, FaceId>( "FaceHashMap", "FaceHashMapSharedPtr" );
    MRJS::bindTypedHashMap<EdgeHashMap, EdgeId, EdgeId>( "EdgeHashMap", "EdgeHashMapSharedPtr" );
    MRJS::bindTypedHashMap<UndirectedEdgeHashMap, UndirectedEdgeId, UndirectedEdgeId>( "UndirectedEdgeHashMap", "UndirectedEdgeHashMapSharedPtr" );
    MRJS::bindTypedHashMap<WholeEdgeHashMap, UndirectedEdgeId, EdgeId>( "WholeEdgeHashMap", "WholeEdgeHashMapSharedPtr" );
    MRJS::bindTypedHashMap<HashMap<UndirectedEdgeId, int>, UndirectedEdgeId, int>( "UndirectedEdgeIdIntHashMap", "UndirectedEdgeIdIntHashMapSharedPtr" );


    ///
    // MRVoxels
    MRJS::bindTypedHashMap<HashMap<int, Box3i>, int, Box3i>( "IntBox3iHashMap", "UndirectedEdgeIdIntHashMapSharedPtr" );
    ///
}
