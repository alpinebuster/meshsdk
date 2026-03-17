#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRPositionVertsSmoothly.h>
#include <MRMesh/MRMeshComponents.h>
#include <MRMesh/MRFillHoleNicely.h>

using namespace emscripten;
using namespace MR;

EMSCRIPTEN_BINDINGS( FillHoleNicelyModule )
{
	class_<SubdivideFillingSettings>( "SubdivideFillingSettings" )
		.constructor<>()
		.property( "maxEdgeLen", &SubdivideFillingSettings::maxEdgeLen )
		.property( "maxEdgeSplits", &SubdivideFillingSettings::maxEdgeSplits )
		.property( "maxAngleChangeAfterFlip", &SubdivideFillingSettings::maxAngleChangeAfterFlip )
		.property( "beforeEdgeSplit", &SubdivideFillingSettings::beforeEdgeSplit )
		.property( "onEdgeSplit", &SubdivideFillingSettings::onEdgeSplit );

	class_<SmoothFillingSettings>( "SmoothFillingSettings" )
		.constructor<>()
		.property( "naturalSmooth", &SmoothFillingSettings::naturalSmooth )
		.property( "edgeWeights", &SmoothFillingSettings::edgeWeights )
		.property( "vmass", &SmoothFillingSettings::vmass );

	class_<OutAttributesFillingSettings>( "OutAttributesFillingSettings" )
		.constructor<>()
		.property( "uvCoords", &OutAttributesFillingSettings::uvCoords, allow_raw_pointers() )
		.property( "colorMap", &OutAttributesFillingSettings::colorMap, allow_raw_pointers() )
		.property( "faceColors", &OutAttributesFillingSettings::faceColors, allow_raw_pointers() );

	class_<FillHoleNicelySettings>( "FillHoleNicelySettings" )
		.constructor<>()
		.property( "triangulateParams", &FillHoleNicelySettings::triangulateParams )
		.property( "triangulateOnly", &FillHoleNicelySettings::triangulateOnly )
		.property( "subdivideSettings", &FillHoleNicelySettings::subdivideSettings )
		.property( "smoothCurvature", &FillHoleNicelySettings::smoothCurvature )
		.property( "smoothSettings", &FillHoleNicelySettings::smoothSettings )
		.property( "outAttributes", &FillHoleNicelySettings::outAttributes );

	function( "fillHoleNicely", &fillHoleNicely );
}
