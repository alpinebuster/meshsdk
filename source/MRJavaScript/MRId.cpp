#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( IdModule )
{
    // Alternative functions for user-defined literals (JavaScript does not support user-defined literals)
    function( "makeEdgeId", static_cast< EdgeId( * )( int ) >( [] ( int i )
    {
        return EdgeId{ i };
    } ) );
    function( "makeUndirectedEdgeId", static_cast< UndirectedEdgeId( * )( int ) >( [] ( int i )
    {
        return UndirectedEdgeId{ i };
    } ) );
    function( "makeFaceId", static_cast< FaceId( * )( int ) >( [] ( int i )
    {
        return FaceId{ i };
    } ) );
    function( "makeVertId", static_cast< VertId( * )( int ) >( [] ( int i )
    {
        return VertId{ i };
    } ) );
    function( "makeVoxelId", static_cast< VoxelId( * )( size_t ) >( [] ( size_t i )
    {
        return VoxelId{ i };
    } ) );

    // Arithmetic Operator Bindings
    // `EdgeId` arithmetic operation
    function( "addEdgeId", select_overload<EdgeId( EdgeId, int )>( [] ( EdgeId id, int a )
    {
        return EdgeId{ id.get() + a };
    } ) );
    function( "addEdgeIdUInt", select_overload<EdgeId( EdgeId, unsigned int )>( [] ( EdgeId id, unsigned int a )
    {
        return EdgeId{ id.get() + a };
    } ) );
    function( "addEdgeIdSize", select_overload<EdgeId( EdgeId, size_t )>( [] ( EdgeId id, size_t a )
    {
        return EdgeId{ id.get() + a };
    } ) );
    function( "subEdgeId", select_overload<EdgeId( EdgeId, int )>( [] ( EdgeId id, int a )
    {
        return EdgeId{ id.get() - a };
    } ) );
    function( "subEdgeIdUInt", select_overload<EdgeId( EdgeId, unsigned int )>( [] ( EdgeId id, unsigned int a )
    {
        return EdgeId{ id.get() - a };
    } ) );
    function( "subEdgeIdSize", select_overload<EdgeId( EdgeId, size_t )>( [] ( EdgeId id, size_t a )
    {
        return EdgeId{ id.get() - a };
    } ) );

    // `UndirectedEdgeId` arithmetic operation
    function( "addUndirectedEdgeId", select_overload<UndirectedEdgeId( UndirectedEdgeId, int )>( [] ( UndirectedEdgeId id, int a )
    {
        return UndirectedEdgeId{ id.get() + a };
    } ) );
    function( "addUndirectedEdgeIdUInt", select_overload<UndirectedEdgeId( UndirectedEdgeId, unsigned int )>( [] ( UndirectedEdgeId id, unsigned int a )
    {
        return UndirectedEdgeId{ id.get() + a };
    } ) );
    function( "addUndirectedEdgeIdSize", select_overload<UndirectedEdgeId( UndirectedEdgeId, size_t )>( [] ( UndirectedEdgeId id, size_t a )
    {
        return UndirectedEdgeId{ id.get() + a };
    } ) );
    function( "subUndirectedEdgeId", select_overload<UndirectedEdgeId( UndirectedEdgeId, int )>( [] ( UndirectedEdgeId id, int a )
    {
        return UndirectedEdgeId{ id.get() - a };
    } ) );
    function( "subUndirectedEdgeIdUInt", select_overload<UndirectedEdgeId( UndirectedEdgeId, unsigned int )>( [] ( UndirectedEdgeId id, unsigned int a )
    {
        return UndirectedEdgeId{ id.get() - a };
    } ) );
    function( "subUndirectedEdgeIdSize", select_overload<UndirectedEdgeId( UndirectedEdgeId, size_t )>( [] ( UndirectedEdgeId id, size_t a )
    {
        return UndirectedEdgeId{ id.get() - a };
    } ) );

    // `FaceId` arithmetic operation
    function( "addFaceId", select_overload<FaceId( FaceId, int )>( [] ( FaceId id, int a )
    {
        return FaceId{ id.get() + a };
    } ) );
    function( "addFaceIdUInt", select_overload<FaceId( FaceId, unsigned int )>( [] ( FaceId id, unsigned int a )
    {
        return FaceId{ id.get() + a };
    } ) );
    function( "addFaceIdSize", select_overload<FaceId( FaceId, size_t )>( [] ( FaceId id, size_t a )
    {
        return FaceId{ id.get() + a };
    } ) );
    function( "subFaceId", select_overload<FaceId( FaceId, int )>( [] ( FaceId id, int a )
    {
        return FaceId{ id.get() - a };
    } ) );
    function( "subFaceIdUInt", select_overload<FaceId( FaceId, unsigned int )>( [] ( FaceId id, unsigned int a )
    {
        return FaceId{ id.get() - a };
    } ) );
    function( "subFaceIdSize", select_overload<FaceId( FaceId, size_t )>( [] ( FaceId id, size_t a )
    {
        return FaceId{ id.get() - a };
    } ) );

    // `VertId` arithmetic operation
    function( "addVertId", select_overload<VertId( VertId, int )>( [] ( VertId id, int a )
    {
        return VertId{ id.get() + a };
    } ) );
    function( "addVertIdUInt", select_overload<VertId( VertId, unsigned int )>( [] ( VertId id, unsigned int a )
    {
        return VertId{ id.get() + a };
    } ) );
    function( "addVertIdSize", select_overload<VertId( VertId, size_t )>( [] ( VertId id, size_t a )
    {
        return VertId{ id.get() + a };
    } ) );
    function( "subVertId", select_overload<VertId( VertId, int )>( [] ( VertId id, int a )
    {
        return VertId{ id.get() - a };
    } ) );
    function( "subVertIdUInt", select_overload<VertId( VertId, unsigned int )>( [] ( VertId id, unsigned int a )
    {
        return VertId{ id.get() - a };
    } ) );
    function( "subVertIdSize", select_overload<VertId( VertId, size_t )>( [] ( VertId id, size_t a )
    {
        return VertId{ id.get() - a };
    } ) );

    // `PixelId` arithmetic operation
    function( "addPixelId", select_overload<PixelId( PixelId, int )>( [] ( PixelId id, int a )
    {
        return PixelId{ id.get() + a };
    } ) );
    function( "addPixelIdUInt", select_overload<PixelId( PixelId, unsigned int )>( [] ( PixelId id, unsigned int a )
    {
        return PixelId{ id.get() + a };
    } ) );
    function( "addPixelIdSize", select_overload<PixelId( PixelId, size_t )>( [] ( PixelId id, size_t a )
    {
        return PixelId{ id.get() + a };
    } ) );
    function( "subPixelId", select_overload<PixelId( PixelId, int )>( [] ( PixelId id, int a )
    {
        return PixelId{ id.get() - a };
    } ) );
    function( "subPixelIdUInt", select_overload<PixelId( PixelId, unsigned int )>( [] ( PixelId id, unsigned int a )
    {
        return PixelId{ id.get() - a };
    } ) );
    function( "subPixelIdSize", select_overload<PixelId( PixelId, size_t )>( [] ( PixelId id, size_t a )
    {
        return PixelId{ id.get() - a };
    } ) );

    // `VoxelId` arithmetic operation
    function( "addVoxelId", select_overload<VoxelId( VoxelId, int )>( [] ( VoxelId id, int a )
    {
        return VoxelId{ id.get() + a };
    } ) );
    function( "addVoxelIdUInt", select_overload<VoxelId( VoxelId, unsigned int )>( [] ( VoxelId id, unsigned int a )
    {
        return VoxelId{ id.get() + a };
    } ) );
    function( "addVoxelIdSize", select_overload<VoxelId( VoxelId, size_t )>( [] ( VoxelId id, size_t a )
    {
        return VoxelId{ id.get() + a };
    } ) );
    function( "subVoxelId", select_overload<VoxelId( VoxelId, int )>( [] ( VoxelId id, int a )
    {
        return VoxelId{ id.get() - a };
    } ) );
    function( "subVoxelIdUInt", select_overload<VoxelId( VoxelId, unsigned int )>( [] ( VoxelId id, unsigned int a )
    {
        return VoxelId{ id.get() - a };
    } ) );
    function( "subVoxelIdSize", select_overload<VoxelId( VoxelId, size_t )>( [] ( VoxelId id, size_t a )
    {
        return VoxelId{ id.get() - a };
    } ) );

    // `RegionId` arithmetic operation
    function( "addRegionId", select_overload<RegionId( RegionId, int )>( [] ( RegionId id, int a )
    {
        return RegionId{ id.get() + a };
    } ) );
    function( "addRegionIdUInt", select_overload<RegionId( RegionId, unsigned int )>( [] ( RegionId id, unsigned int a )
    {
        return RegionId{ id.get() + a };
    } ) );
    function( "addRegionIdSize", select_overload<RegionId( RegionId, size_t )>( [] ( RegionId id, size_t a )
    {
        return RegionId{ id.get() + a };
    } ) );
    function( "subRegionId", select_overload<RegionId( RegionId, int )>( [] ( RegionId id, int a )
    {
        return RegionId{ id.get() - a };
    } ) );
    function( "subRegionIdUInt", select_overload<RegionId( RegionId, unsigned int )>( [] ( RegionId id, unsigned int a )
    {
        return RegionId{ id.get() - a };
    } ) );
    function( "subRegionIdSize", select_overload<RegionId( RegionId, size_t )>( [] ( RegionId id, size_t a )
    {
        return RegionId{ id.get() - a };
    } ) );

    // `NodeId` arithmetic operation
    function( "addNodeId", select_overload<NodeId( NodeId, int )>( [] ( NodeId id, int a )
    {
        return NodeId{ id.get() + a };
    } ) );
    function( "addNodeIdUInt", select_overload<NodeId( NodeId, unsigned int )>( [] ( NodeId id, unsigned int a )
    {
        return NodeId{ id.get() + a };
    } ) );
    function( "addNodeIdSize", select_overload<NodeId( NodeId, size_t )>( [] ( NodeId id, size_t a )
    {
        return NodeId{ id.get() + a };
    } ) );
    function( "subNodeId", select_overload<NodeId( NodeId, int )>( [] ( NodeId id, int a )
    {
        return NodeId{ id.get() - a };
    } ) );
    function( "subNodeIdUInt", select_overload<NodeId( NodeId, unsigned int )>( [] ( NodeId id, unsigned int a )
    {
        return NodeId{ id.get() - a };
    } ) );
    function( "subNodeIdSize", select_overload<NodeId( NodeId, size_t )>( [] ( NodeId id, size_t a )
    {
        return NodeId{ id.get() - a };
    } ) );

    // `ObjId` arithmetic operation
    function( "addObjId", select_overload<ObjId( ObjId, int )>( [] ( ObjId id, int a )
    {
        return ObjId{ id.get() + a };
    } ) );
    function( "addObjIdUInt", select_overload<ObjId( ObjId, unsigned int )>( [] ( ObjId id, unsigned int a )
    {
        return ObjId{ id.get() + a };
    } ) );
    function( "addObjIdSize", select_overload<ObjId( ObjId, size_t )>( [] ( ObjId id, size_t a )
    {
        return ObjId{ id.get() + a };
    } ) );
    function( "subObjId", select_overload<ObjId( ObjId, int )>( [] ( ObjId id, int a )
    {
        return ObjId{ id.get() - a };
    } ) );
    function( "subObjIdUInt", select_overload<ObjId( ObjId, unsigned int )>( [] ( ObjId id, unsigned int a )
    {
        return ObjId{ id.get() - a };
    } ) );
    function( "subObjIdSize", select_overload<ObjId( ObjId, size_t )>( [] ( ObjId id, size_t a )
    {
        return ObjId{ id.get() - a };
    } ) );

    // `TextureId` arithmetic operation
    function( "addTextureId", select_overload<TextureId( TextureId, int )>( [] ( TextureId id, int a )
    {
        return TextureId{ id.get() + a };
    } ) );
    function( "addTextureIdUInt", select_overload<TextureId( TextureId, unsigned int )>( [] ( TextureId id, unsigned int a )
    {
        return TextureId{ id.get() + a };
    } ) );
    function( "addTextureIdSize", select_overload<TextureId( TextureId, size_t )>( [] ( TextureId id, size_t a )
    {
        return TextureId{ id.get() + a };
    } ) );
    function( "subTextureId", select_overload<TextureId( TextureId, int )>( [] ( TextureId id, int a )
    {
        return TextureId{ id.get() - a };
    } ) );
    function( "subTextureIdUInt", select_overload<TextureId( TextureId, unsigned int )>( [] ( TextureId id, unsigned int a )
    {
        return TextureId{ id.get() - a };
    } ) );
    function( "subTextureIdSize", select_overload<TextureId( TextureId, size_t )>( [] ( TextureId id, size_t a )
    {
        return TextureId{ id.get() - a };
    } ) );

    // `GraphVertId` arithmetic operation
    function( "addGraphVertId", select_overload<GraphVertId( GraphVertId, int )>( [] ( GraphVertId id, int a )
    {
        return GraphVertId{ id.get() + a };
    } ) );
    function( "addGraphVertIdUInt", select_overload<GraphVertId( GraphVertId, unsigned int )>( [] ( GraphVertId id, unsigned int a )
    {
        return GraphVertId{ id.get() + a };
    } ) );
    function( "addGraphVertIdSize", select_overload<GraphVertId( GraphVertId, size_t )>( [] ( GraphVertId id, size_t a )
    {
        return GraphVertId{ id.get() + a };
    } ) );
    function( "subGraphVertId", select_overload<GraphVertId( GraphVertId, int )>( [] ( GraphVertId id, int a )
    {
        return GraphVertId{ id.get() - a };
    } ) );
    function( "subGraphVertIdUInt", select_overload<GraphVertId( GraphVertId, unsigned int )>( [] ( GraphVertId id, unsigned int a )
    {
        return GraphVertId{ id.get() - a };
    } ) );
    function( "subGraphVertIdSize", select_overload<GraphVertId( GraphVertId, size_t )>( [] ( GraphVertId id, size_t a )
    {
        return GraphVertId{ id.get() - a };
    } ) );

    // `GraphEdgeId` arithmetic operation
    function( "addGraphEdgeId", select_overload<GraphEdgeId( GraphEdgeId, int )>( [] ( GraphEdgeId id, int a )
    {
        return GraphEdgeId{ id.get() + a };
    } ) );
    function( "addGraphEdgeIdUInt", select_overload<GraphEdgeId( GraphEdgeId, unsigned int )>( [] ( GraphEdgeId id, unsigned int a )
    {
        return GraphEdgeId{ id.get() + a };
    } ) );
    function( "addGraphEdgeIdSize", select_overload<GraphEdgeId( GraphEdgeId, size_t )>( [] ( GraphEdgeId id, size_t a )
    {
        return GraphEdgeId{ id.get() + a };
    } ) );
    function( "subGraphEdgeId", select_overload<GraphEdgeId( GraphEdgeId, int )>( [] ( GraphEdgeId id, int a )
    {
        return GraphEdgeId{ id.get() - a };
    } ) );
    function( "subGraphEdgeIdUInt", select_overload<GraphEdgeId( GraphEdgeId, unsigned int )>( [] ( GraphEdgeId id, unsigned int a )
    {
        return GraphEdgeId{ id.get() - a };
    } ) );
    function( "subGraphEdgeIdSize", select_overload<GraphEdgeId( GraphEdgeId, size_t )>( [] ( GraphEdgeId id, size_t a )
    {
        return GraphEdgeId{ id.get() - a };
    } ) );
}
