#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRMeshTriPoint.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRMapEdge.h>
#include <MRMesh/MRGridSettings.h>
#include <MRMesh/MRPartMapping.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRMeshTopology.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( MeshTopologyModule )
{
    class_<MeshTopology>( "MeshTopology" )
        .constructor<>()

        // Edge operations
        .function( "makeEdge", &MeshTopology::makeEdge )
        .function( "isLoneEdge", &MeshTopology::isLoneEdge )
        .function( "lastNotLoneEdge", &MeshTopology::lastNotLoneEdge )
        .function( "excludeLoneEdges", &MeshTopology::excludeLoneEdges )
        .function( "edgeSize", &MeshTopology::edgeSize )
        .function( "edgeCapacity", &MeshTopology::edgeCapacity )
        .function( "undirectedEdgeSize", &MeshTopology::undirectedEdgeSize )
        .function( "undirectedEdgeCapacity", &MeshTopology::undirectedEdgeCapacity )
        .function( "computeNotLoneUndirectedEdges", &MeshTopology::computeNotLoneUndirectedEdges )
        .function( "findNotLoneUndirectedEdges", &MeshTopology::findNotLoneUndirectedEdges )
        .function( "edgeReserve", &MeshTopology::edgeReserve )
        .function( "hasEdge", &MeshTopology::hasEdge )
        .function( "heapBytes", &MeshTopology::heapBytes )
        .function( "shrinkToFit", &MeshTopology::shrinkToFit )

        // Edge topology operations
        .function( "splice", &MeshTopology::splice )
        .function( "collapseEdge", &MeshTopology::collapseEdge )

        // Edge navigation
        .function( "next", &MeshTopology::next )
        .function( "prev", &MeshTopology::prev )
        .function( "org", &MeshTopology::org )
        .function( "dest", &MeshTopology::dest )
        .function( "left", &MeshTopology::left )
        .function( "right", &MeshTopology::right )

        // Edge/vertex/face assignment
        .function( "setOrg", &MeshTopology::setOrg )
        .function( "setLeft", &MeshTopology::setLeft )

        // Ring operations
        .function( "fromSameOriginRing", &MeshTopology::fromSameOriginRing )
        .function( "fromSameLeftRing", &MeshTopology::fromSameLeftRing )

        // Degree operations
        .function( "getOrgDegree", &MeshTopology::getOrgDegree )
        .function( "getVertDegree", &MeshTopology::getVertDegree )
        .function( "getLeftDegree", &MeshTopology::getLeftDegree )
        .function( "getFaceDegree", &MeshTopology::getFaceDegree )

        // Triangle operations
        .function( "isLeftTri", &MeshTopology::isLeftTri )

        ///
        .function( "getTriVerts", select_overload<void( FaceId, VertId&, VertId&, VertId& ) const>( &MeshTopology::getTriVerts ) )
        .function( "getTriVertsWithArray3VertId", select_overload<void( FaceId, ThreeVertIds& ) const>( &MeshTopology::getTriVerts ) )
        .function( "getTriVertsWithThreeVertIds", select_overload<void( FaceId, ThreeVertIds& ) const>( &MeshTopology::getTriVerts ) )
        .function( "getTriVertsWithFaceId", select_overload<ThreeVertIds( FaceId ) const>( &MeshTopology::getTriVerts ) )
        ///

        .function( "isTriVert", &MeshTopology::isTriVert )
        .function( "getAllTriVerts", &MeshTopology::getAllTriVerts )
        .function( "getTriangulation", &MeshTopology::getTriangulation )

        ///
        .function( "getLeftTriVerts", select_overload<void( EdgeId, VertId&, VertId&, VertId& ) const>( &MeshTopology::getLeftTriVerts ) )
        .function( "getLeftTriVertsWithArray3VertId", select_overload<void( EdgeId, ThreeVertIds& ) const>( &MeshTopology::getLeftTriVerts ) )
        .function( "getLeftTriVertsWithThreeVertIds", select_overload<void( EdgeId, ThreeVertIds& ) const>( &MeshTopology::getLeftTriVerts ) )
        .function( "getLeftTriVertsWithEdgeId", select_overload<ThreeVertIds( EdgeId ) const>( &MeshTopology::getLeftTriVerts ) )
        ///

        .function( "getLeftTriEdges", &MeshTopology::getLeftTriEdges )

        ///
        .function( "getTriEdges", select_overload<void( FaceId, EdgeId&, EdgeId&, EdgeId& ) const>( &MeshTopology::getTriEdges ) )
        // FIXME
        // .function( "getTriEdgesWithArray3EdgeId", select_overload<void( FaceId, std::array<EdgeId, 3>& ) const>( &MeshTopology::getTriEdges ) )
        ///

        .function( "isLeftQuad", &MeshTopology::isLeftQuad )

        // Vertex operations
        .function( "edgePerVertex", &MeshTopology::edgePerVertex )
        .function( "edgeWithOrg", &MeshTopology::edgeWithOrg )
        .function( "hasVert", &MeshTopology::hasVert )
        .function( "numValidVerts", &MeshTopology::numValidVerts )
        .function( "lastValidVert", &MeshTopology::lastValidVert )
        .function( "addVertId", &MeshTopology::addVertId )
        .function( "vertResize", &MeshTopology::vertResize )
        .function( "vertResizeWithReserve", &MeshTopology::vertResizeWithReserve )
        .function( "vertReserve", &MeshTopology::vertReserve )
        .function( "vertSize", &MeshTopology::vertSize )
        .function( "vertCapacity", &MeshTopology::vertCapacity )
        .function( "getValidVerts", &MeshTopology::getValidVerts )
        .function( "getVertIds", &MeshTopology::getVertIds, allow_raw_pointers() )
        ///
        .function( "flip", select_overload<void( VertBitSet& ) const>( &MeshTopology::flip ) )
        .function( "flipWithFaceBitSet", select_overload<void( FaceBitSet& ) const>( &MeshTopology::flip ) )
        /// END

        // Face operations
        .function( "edgePerFace", &MeshTopology::edgePerFace )
        .function( "edgeWithLeft", &MeshTopology::edgeWithLeft )
        .function( "hasFace", &MeshTopology::hasFace )
        .function( "sharedEdge", &MeshTopology::sharedEdge )

        .function( "sharedVertInOrg", select_overload<EdgeId( EdgeId, EdgeId ) const>( &MeshTopology::sharedVertInOrg ) )
        .function( "sharedVertInOrgWithFaces", select_overload<EdgeId( FaceId, FaceId ) const>( &MeshTopology::sharedVertInOrg ) )

        .function( "sharedFace", &MeshTopology::sharedFace )
        .function( "numValidFaces", &MeshTopology::numValidFaces )
        .function( "lastValidFace", &MeshTopology::lastValidFace )
        .function( "addFaceId", &MeshTopology::addFaceId )
        .function( "deleteFace", &MeshTopology::deleteFace, allow_raw_pointers() )
        .function( "deleteFaces", &MeshTopology::deleteFaces, allow_raw_pointers() )
        .function( "faceResize", &MeshTopology::faceResize )
        .function( "faceResizeWithReserve", &MeshTopology::faceResizeWithReserve )
        .function( "faceReserve", &MeshTopology::faceReserve )
        .function( "faceSize", &MeshTopology::faceSize )
        .function( "faceCapacity", &MeshTopology::faceCapacity )
        .function( "getValidFaces", &MeshTopology::getValidFaces )
        .function( "getFaceIds", &MeshTopology::getFaceIds, allow_raw_pointers() )

        // Boundary operations
        .function( "bdEdgeSameLeft", &MeshTopology::bdEdgeSameLeft, allow_raw_pointers() )
        .function( "isLeftBdFace", &MeshTopology::isLeftBdFace, allow_raw_pointers() )
        .function( "bdEdgeWithLeft", &MeshTopology::bdEdgeWithLeft, allow_raw_pointers() )
        .function( "isBdFace", &MeshTopology::isBdFace, allow_raw_pointers() )
        .function( "findBdFaces", &MeshTopology::findBdFaces, allow_raw_pointers() )
        .function( "isLeftInRegion", &MeshTopology::isLeftInRegion, allow_raw_pointers() )
        .function( "isInnerEdge", &MeshTopology::isInnerEdge, allow_raw_pointers() )
        .function( "isBdEdge", &MeshTopology::isBdEdge, allow_raw_pointers() )
        .function( "findLeftBdEdges", &MeshTopology::findLeftBdEdges, allow_raw_pointers() )
        .function( "bdEdgeSameOrigin", &MeshTopology::bdEdgeSameOrigin, allow_raw_pointers() )
        .function( "isBdVertexInOrg", &MeshTopology::isBdVertexInOrg, allow_raw_pointers() )
        .function( "bdEdgeWithOrigin", &MeshTopology::bdEdgeWithOrigin, allow_raw_pointers() )
        .function( "isBdVertex", &MeshTopology::isBdVertex, allow_raw_pointers() )
        .function( "findBdVerts", &MeshTopology::findBdVerts, allow_raw_pointers() )
        .function( "isInnerOrBdVertex", &MeshTopology::isInnerOrBdVertex, allow_raw_pointers() )
        .function( "isLeftBdEdge", &MeshTopology::isLeftBdEdge, allow_raw_pointers() )
        .function( "isInnerOrBdEdge", &MeshTopology::isInnerOrBdEdge, allow_raw_pointers() )
        .function( "nextLeftBd", &MeshTopology::nextLeftBd, allow_raw_pointers() )
        .function( "prevLeftBd", &MeshTopology::prevLeftBd, allow_raw_pointers() )

        // Mesh queries
        .function( "findEdge", &MeshTopology::findEdge )
        .function( "isClosed", &MeshTopology::isClosed, allow_raw_pointers() )
        .function( "findHoleRepresentiveEdges", &MeshTopology::findHoleRepresentiveEdges, allow_raw_pointers() )
        .function( "findNumHoles", &MeshTopology::findNumHoles, allow_raw_pointers() )
        .function( "getLeftRing", &MeshTopology::getLeftRing )
        .function( "getLeftRings", &MeshTopology::getLeftRings )

        // Path operations
        .function( "getPathVertices", &MeshTopology::getPathVertices )
        .function( "getPathLeftFaces", &MeshTopology::getPathLeftFaces )
        .function( "getPathRightFaces", &MeshTopology::getPathRightFaces )

        // Topology modifications
        .function( "flipEdge", &MeshTopology::flipEdge )
        .function( "splitEdge", &MeshTopology::splitEdge, allow_raw_pointers() )
        .function( "splitFace", &MeshTopology::splitFace, allow_raw_pointers() )
        .function( "flipOrientation", &MeshTopology::flipOrientation, allow_raw_pointers() )

        // Mesh building and packing
        .function( "addPart", select_overload<void( const MeshTopology&, FaceMap*, VertMap*, WholeEdgeMap*, bool )>( &MeshTopology::addPart ), allow_raw_pointers() )
        .function( "addPartWithPartMapping", select_overload<void( const MeshTopology&, const PartMapping&, bool )>( &MeshTopology::addPart ), allow_raw_pointers() )
    
        ///
        .function( "addPartByMaskWithPtr", select_overload<void( const MeshTopology&, const FaceBitSet*, const PartMapping& )>( &MeshTopology::addPartByMask ), allow_raw_pointers() )
        .function( "addPartByMask", select_overload<void( const MeshTopology&, const FaceBitSet&, const PartMapping& )>( &MeshTopology::addPartByMask ), allow_raw_pointers() )

        .function( "addPartByMaskWithEdgePathPtr", select_overload<void( const MeshTopology&, const FaceBitSet*, bool, const std::vector<EdgePath>&, const std::vector<EdgePath>&, const PartMapping& )>( &MeshTopology::addPartByMask ), allow_raw_pointers() )
        .function( "addPartByMaskWithEdgePath",        select_overload<void( const MeshTopology&, const FaceBitSet&, bool, const std::vector<EdgePath>&, const std::vector<EdgePath>&, const PartMapping& )>( &MeshTopology::addPartByMask ) )
        ///
    
        .function( "rotateTriangles", &MeshTopology::rotateTriangles )
        .function( "pack", select_overload<void( FaceMap*, VertMap*, WholeEdgeMap*, bool )>( &MeshTopology::pack ), allow_raw_pointers() )
        .function( "packWithPackMapping", select_overload<void( const PackMapping& )>( &MeshTopology::pack ) )
        .function( "packMinMem", &MeshTopology::packMinMem )

        // IO
        // FIXME: `BindingError: Missing binding for type: 'NSt3__213basic_istreamIcNS_11char_traitsIcEEEE'`
        // .function( "write", &MeshTopology::write )
        // .function( "read", &MeshTopology::read )

        // Operators
        .function( "equals", optional_override( []( const MeshTopology& self, const MeshTopology& other ) { return self == other; }) )

        // Parallel operations
        .function( "resizeBeforeParallelAdd", &MeshTopology::resizeBeforeParallelAdd )
        .function( "addPackedPart", &MeshTopology::addPackedPart )
        .function( "computeValidsFromEdges", &MeshTopology::computeValidsFromEdges )
        .function( "stopUpdatingValids", &MeshTopology::stopUpdatingValids )
        .function( "updatingValids", &MeshTopology::updatingValids )
        .function( "preferEdges", &MeshTopology::preferEdges )
        .function( "buildGridMesh", &MeshTopology::buildGridMesh )

        // Validation
        .function( "checkValidity", &MeshTopology::checkValidity );


    function( "loadMeshDll", &loadMeshDll );
}
