#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRMeshPart.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRUnionFind.h>
#include <MRMesh/MRMeshComponents.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshComponentsModule )
{
    enum_<MeshComponents::FaceIncidence>( "FaceIncidence" )
        .value( "PerEdge", MeshComponents::FaceIncidence::PerEdge )
        .value( "PerVertex", MeshComponents::FaceIncidence::PerVertex );


	class_<MeshComponents::ExpandToComponentsParams>( "ExpandToComponentsParams" )
		.constructor<>()
		.property( "coverRatio", &MeshComponents::ExpandToComponentsParams::coverRatio )
		.property( "incidence", &MeshComponents::ExpandToComponentsParams::incidence )
		.property( "isCompBd", &MeshComponents::ExpandToComponentsParams::isCompBd, return_value_policy::reference() )

		.function( "getOptOutNumComponents", optional_override( [] ( MeshComponents::ExpandToComponentsParams& self ) -> int
		{
			if ( !self.optOutNumComponents ) throw std::runtime_error( "maxEdgeLength is null" );
			return *self.optOutNumComponents;
		}))
		.function( "setOptOutNumComponents", optional_override( [] ( MeshComponents::ExpandToComponentsParams& self, int v )
		{
			if ( !self.optOutNumComponents ) self.optOutNumComponents = new int;
			*self.optOutNumComponents = v;
		}))

		.property( "cb", &MeshComponents::ExpandToComponentsParams::cb );


	class_<MeshComponents::LargeByAreaComponentsSettings>( "LargeByAreaComponentsSettings" )
		.constructor<>()
		.property( "maxLargeComponents", &MeshComponents::LargeByAreaComponentsSettings::maxLargeComponents )

		.function( "getNumSmallerComponents", optional_override( [] ( MeshComponents::LargeByAreaComponentsSettings& self ) -> int
		{
			if ( !self.numSmallerComponents ) throw std::runtime_error( "maxEdgeLength is null" );
			return *self.numSmallerComponents;
		}))
		.function( "setNumSmallerComponents", optional_override( [] ( MeshComponents::LargeByAreaComponentsSettings& self, int v ) -> void
		{
			if ( !self.numSmallerComponents ) self.numSmallerComponents = new int;
			*self.numSmallerComponents = v;
		}))

		.property( "minArea", &MeshComponents::LargeByAreaComponentsSettings::minArea )
		.property( "isCompBd", &MeshComponents::LargeByAreaComponentsSettings::isCompBd, return_value_policy::reference() );


    ///
    function( "getComponent", &MeshComponents::getComponent, allow_raw_pointers() );
    function( "getComponentVerts", &MeshComponents::getComponentVerts, allow_raw_pointers() );
    function( "getLargestComponentVerts", &MeshComponents::getLargestComponentVerts, allow_raw_pointers() );
    function( "getLargeComponentVerts", &MeshComponents::getLargeComponentVerts, allow_raw_pointers() );

    function( "getLargeByAreaComponents", select_overload<FaceBitSet( const MeshPart&, float, const UndirectedEdgeBitSet* )>( &MeshComponents::getLargeByAreaComponents ), allow_raw_pointers() );
    function( "getLargeByAreaComponentsWithUnionFind", select_overload<FaceBitSet( const MeshPart&, UnionFind<FaceId>&, float, UndirectedEdgeBitSet* )>( &MeshComponents::getLargeByAreaComponents ), allow_raw_pointers() );

    function( "expandToComponents", &MeshComponents::expandToComponents );
    function( "getNLargeByAreaComponents", &MeshComponents::getNLargeByAreaComponents );
    function( "getLargeByAreaSmoothComponents", &MeshComponents::getLargeByAreaSmoothComponents, allow_raw_pointers() );
    function( "getComponentsVerts", &MeshComponents::getComponentsVerts, allow_raw_pointers() );
    function( "getNumComponents", &MeshComponents::getNumComponents, allow_raw_pointers() );

    function( "getAllComponents", select_overload<std::vector<FaceBitSet>( const MeshPart&, MeshComponents::FaceIncidence, const UndirectedEdgeBitSet* )>( &MeshComponents::getAllComponents ), allow_raw_pointers() );
    function( "getAllComponentsWithMaxCount", select_overload<std::pair<std::vector<FaceBitSet>, int>( const MeshPart&, int, MeshComponents::FaceIncidence, const UndirectedEdgeBitSet* )>( &MeshComponents::getAllComponents ), allow_raw_pointers() );
    function( "getAllComponentsFromMap", select_overload<std::vector<FaceBitSet>( Face2RegionMap&, int, const FaceBitSet&, int )>( &MeshComponents::getAllComponents ) );

    function( "getAllComponentsMap", &MeshComponents::getAllComponentsMap, allow_raw_pointers() );
    function( "getRegionAreas", &MeshComponents::getRegionAreas );
    function( "getLargeByAreaRegions", &MeshComponents::getLargeByAreaRegions );
    function( "getAllComponentsVerts", &MeshComponents::getAllComponentsVerts, allow_raw_pointers() );
    function( "getAllComponentsVertsSeparatedByPath", &MeshComponents::getAllComponentsVertsSeparatedByPath );
    function( "getAllComponentsVertsSeparatedByPaths", &MeshComponents::getAllComponentsVertsSeparatedByPaths );
    function( "getAllComponentsEdges", &MeshComponents::getAllComponentsEdges );
    function( "getAllComponentsUndirectedEdges", &MeshComponents::getAllComponentsUndirectedEdges );

    function( "hasFullySelectedComponent", select_overload<bool( const Mesh&, const VertBitSet& )>( &MeshComponents::hasFullySelectedComponent ) );
    function( "hasFullySelectedComponentFromTopology", select_overload<bool( const MeshTopology&, const VertBitSet& )>( &MeshComponents::hasFullySelectedComponent ) );

    function( "excludeFullySelectedComponents", &MeshComponents::excludeFullySelectedComponents );

    function( "getUnionFindStructureVertsFromTopology", select_overload<UnionFind<VertId>( const MeshTopology&, const VertBitSet* )>( &MeshComponents::getUnionFindStructureVerts ), allow_raw_pointers() );
    function( "getUnionFindStructureVertsFromEdgeBitSet", select_overload<UnionFind<VertId>( const Mesh&, const EdgeBitSet& )>( &MeshComponents::getUnionFindStructureVerts ) );
    function( "getUnionFindStructureVertsWithUndirectedEdgeBitSet", select_overload<UnionFind<VertId>( const Mesh&, const UndirectedEdgeBitSet& )>( &MeshComponents::getUnionFindStructureVerts ) );

    function( "getUnionFindStructureVertsEx", &MeshComponents::getUnionFindStructureVertsEx );
    function( "getUnionFindStructureVertsSeparatedByPath", &MeshComponents::getUnionFindStructureVertsSeparatedByPath, allow_raw_pointers() );
    function( "getUnionFindStructureVertsSeparatedByPaths", &MeshComponents::getUnionFindStructureVertsSeparatedByPaths, allow_raw_pointers() );
    function( "getUnionFindStructureUndirectedEdges", &MeshComponents::getUnionFindStructureUndirectedEdges );
    function( "getComponentsUndirectedEdges", &MeshComponents::getComponentsUndirectedEdges );
    ///
}
