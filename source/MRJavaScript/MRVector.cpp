#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRVector4.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRMeshOrPoints.h>
#include <MRMesh/MRMultiwayICP.h>
#include <MRMesh/MRVector.h>

#include "MRVector.h"

using namespace emscripten;
using namespace MR;


// ------------------------------------------------------------------------
// Bind the Embind interface for `Vector<*, *>`
// ------------------------------------------------------------------------
EMSCRIPTEN_BINDINGS( VectorModule )
{
    ///
    MRJS::bindTypedVector<Vector<double, EdgeId>, EdgeId>( "VectorDoubleEdgeId" );
    MRJS::bindTypedVector<Vector<double, UndirectedEdgeId>, UndirectedEdgeId>( "VectorDoubleUndirectedEdgeId" );
    MRJS::bindTypedVector<Vector<double, FaceId>, FaceId>( "VectorDoubleFaceId" );
    MRJS::bindTypedVector<Vector<double, VertId>, VertId>( "VectorDoubleVertId" );
    MRJS::bindTypedVector<Vector<double, PixelId>, PixelId>( "VectorDoublePixelId" );
    MRJS::bindTypedVector<Vector<double, VoxelId>, VoxelId>( "VectorDoubleVoxelId" );
    MRJS::bindTypedVector<Vector<double, RegionId>, RegionId>( "VectorDoubleRegionId" );
    MRJS::bindTypedVector<Vector<double, NodeId>, NodeId>( "VectorDoubleNodeId" );
    MRJS::bindTypedVector<Vector<double, ObjId>, ObjId>( "VectorDoubleObjId" );
    MRJS::bindTypedVector<Vector<double, TextureId>, TextureId>( "VectorDoubleTextureId" );
    MRJS::bindTypedVector<Vector<double, GraphVertId>, GraphVertId>( "VectorDoubleGraphVertId" );
    MRJS::bindTypedVector<Vector<double, GraphEdgeId>, GraphEdgeId>( "VectorDoubleGraphEdgeId" );
    ///


    ///
    MRJS::bindTypedVector<Vector<size_t, EdgeId>, EdgeId>( "VectorSizeTEdgeId" );
    MRJS::bindTypedVector<Vector<size_t, UndirectedEdgeId>, UndirectedEdgeId>( "VectorSizeTUndirectedEdgeId" );
    MRJS::bindTypedVector<Vector<size_t, FaceId>, FaceId>( "VectorSizeTFaceId" );
    MRJS::bindTypedVector<Vector<size_t, VertId>, VertId>( "VectorSizeTVertId" );
    MRJS::bindTypedVector<Vector<size_t, PixelId>, PixelId>( "VectorSizeTPixelId" );
    MRJS::bindTypedVector<Vector<size_t, VoxelId>, VoxelId>( "VectorSizeTVoxelId" );
    MRJS::bindTypedVector<Vector<size_t, RegionId>, RegionId>( "VectorSizeTRegionId" );
    MRJS::bindTypedVector<Vector<size_t, NodeId>, NodeId>( "VectorSizeTNodeId" );
    MRJS::bindTypedVector<Vector<size_t, ObjId>, ObjId>( "VectorSizeTObjId" );
    MRJS::bindTypedVector<Vector<size_t, TextureId>, TextureId>( "VectorSizeTTextureId" );
    MRJS::bindTypedVector<Vector<size_t, GraphVertId>, GraphVertId>( "VectorSizeTGraphVertId" );
    MRJS::bindTypedVector<Vector<size_t, GraphEdgeId>, GraphEdgeId>( "VectorSizeTGraphEdgeId" );
    ///


    ///
    MRJS::bindTypedVector<Vector<int, EdgeId>, EdgeId>( "VectorIntEdgeId" );
    MRJS::bindTypedVector<Vector<int, UndirectedEdgeId>, UndirectedEdgeId>( "VectorIntUndirectedEdgeId" );
    MRJS::bindTypedVector<Vector<int, FaceId>, FaceId>( "VectorIntFaceId" );
    MRJS::bindTypedVector<Vector<int, VertId>, VertId>( "VectorIntVertId" );
    MRJS::bindTypedVector<Vector<int, PixelId>, PixelId>( "VectorIntPixelId" );
    MRJS::bindTypedVector<Vector<int, VoxelId>, VoxelId>( "VectorIntVoxelId" );
    MRJS::bindTypedVector<Vector<int, RegionId>, RegionId>( "VectorIntRegionId" );
    MRJS::bindTypedVector<Vector<int, NodeId>, NodeId>( "VectorIntNodeId" );
    MRJS::bindTypedVector<Vector<int, ObjId>, ObjId>( "VectorIntObjId" );
    MRJS::bindTypedVector<Vector<int, TextureId>, TextureId>( "VectorIntTextureId" );
    MRJS::bindTypedVector<Vector<int, GraphVertId>, GraphVertId>( "VectorIntGraphVertId" );
    MRJS::bindTypedVector<Vector<int, GraphEdgeId>, GraphEdgeId>( "VectorIntGraphEdgeId" );
    ///


    ///
    MRJS::bindTypedVector<Vector<MeshOrPointsXf, ObjId>, ObjId>( "VectorMeshOrPointsXfObjId" );

    MRJS::bindTypedVector<Vector<ICPGroupPairs, ICPElementId>, ICPElementId>( "VectorICPGroupPairsICPElementId" );
    MRJS::bindTypedVector<Vector<Vector<ICPGroupPairs, ICPElementId>, ICPElementId>, ICPElementId>( "VectorVectorICPGroupPairsICPElementId" );

    MRJS::bindTypedVector<Vector<ICPPairsGrid, ICPLayer>, ICPLayer>( "VectorICPPairsGridICPLayer" );
    MRJS::bindTypedVector<Vector<VertBitSet, ObjId>, ObjId>( "VectorVertBitSetObjId" );
    MRJS::bindTypedVector<Vector<AffineXf3f, ObjId>, ObjId>( "VectorAffineXf3fObjId" );

    MRJS::bindTypedVector<Vector<MultiObjsSamples, ICPElementId>, ICPElementId>( "VectorMultiObjsSamplesICPElementId" );
    MRJS::bindTypedVector<Vector<Vector<MultiObjsSamples, ICPElementId>, ICPLayer>, ICPLayer>( "VectorVectorMultiObjsSamplesICPLayer" );
    ///


    ///
    MRJS::bindTypedVector<Vector<int, size_t>, size_t>( "VectorIntSizeT" );
    MRJS::bindTypedVector<Vector<float, size_t>, size_t>( "VectorFloatSizeT" );
    MRJS::bindTypedVector<Vector<long long, size_t>, size_t>( "VectorLongLongSizeT" );
    MRJS::bindTypedVector<Vector<double, size_t>, size_t>( "VectorDoubleSizeT" );
    MRJS::bindTypedVector<Vector<size_t, size_t>, size_t>( "VectorSizeTSizeT" );
    ///


    function( "getAti", select_overload<int ( const Vector<int, size_t>&,    size_t, int )>( &getAt ) );
    function( "getAtf", select_overload<float ( const Vector<float, size_t>&,  size_t, float )>( &getAt ) );
    function( "getAtd", select_overload<double ( const Vector<double, size_t>&, size_t, double )>( &getAt ) );
    function( "getAtll", select_overload<long long ( const Vector<long long, size_t>&, size_t, long long )>( &getAt ) );
}
