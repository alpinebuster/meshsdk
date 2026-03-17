#include <MRPch/MRWasm.h>

#include <MRMesh/MREnums.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( EnumsModule )
{
	enum_<RememberShape>( "RememberShape" )
		.value( "Yes", RememberShape::Yes )
		.value( "No", RememberShape::No );

	enum_<VertexMass>( "VertexMass" )
		.value( "Unit", VertexMass::Unit )
		.value( "NeiArea", VertexMass::NeiArea );

	enum_<EdgeWeights>( "EdgeWeights" )
		.value( "Unit", EdgeWeights::Unit )
		// CotanWithAreaEqWeight => use `EdgeWeights::Cotan` and `VertexMass::NeiArea` instead
		.value( "Cotan", EdgeWeights::Cotan );

	enum_<Processing>( "Processing" )
		.value( "Continue", Processing::Continue )
		.value( "Stop", Processing::Stop );

	enum_<OrientNormals>( "OrientNormals" )
		.value( "TowardOrigin", OrientNormals::TowardOrigin )
		.value( "AwayFromOrigin", OrientNormals::AwayFromOrigin )
		.value( "Smart", OrientNormals::Smart );

	enum_<OffsetMode>( "OffsetMode" )
		.value( "Smooth", OffsetMode::Smooth )     // OpenVDB dual marching cubes
		.value( "Standard", OffsetMode::Standard )   // Standard marching cubes
		.value( "Sharpening", OffsetMode::Sharpening ) // Marching cubes with sharpening
		;

	enum_<ColoringType>( "ColoringType" )
		.value( "SolidColor", ColoringType::SolidColor )
		.value( "PrimitivesColorMap", ColoringType::PrimitivesColorMap )
		.value( "FacesColorMap", ColoringType::FacesColorMap )
		.value( "LinesColorMap", ColoringType::LinesColorMap )
		.value( "VertsColorMap", ColoringType::VertsColorMap );

	// Convert to `std::string` for automatic binding to JS strings.
	function( "asString", optional_override( [] ( ColoringType ct )
	{
		return std::string( asString( ct ) );
	} ) );

	enum_<UseAABBTree>( "UseAABBTree" )
		.value( "No", UseAABBTree::No )
		.value( "Yes", UseAABBTree::Yes )
		.value( "YesIfAlreadyConstructed", UseAABBTree::YesIfAlreadyConstructed );

	enum_<GeodesicPathApprox>( "GeodesicPathApprox" )
		.value( "DijkstraBiDir", GeodesicPathApprox::DijkstraBiDir )
		.value( "DijkstraAStar", GeodesicPathApprox::DijkstraAStar )
		.value( "FastMarching", GeodesicPathApprox::FastMarching );
}
