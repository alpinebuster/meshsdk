#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRBooleanOperation.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( BooleanOperationModule )
{
	enum_<BooleanOperation>( "BooleanOperation" )
		.value( "InsideA", BooleanOperation::InsideA )
		.value( "InsideB", BooleanOperation::InsideB )
		.value( "OutsideA", BooleanOperation::OutsideA )
		.value( "OutsideB", BooleanOperation::OutsideB )
		.value( "Union", BooleanOperation::Union )
		.value( "Intersection", BooleanOperation::Intersection )
		.value( "DifferenceBA", BooleanOperation::DifferenceBA )
		.value( "DifferenceAB", BooleanOperation::DifferenceAB )
		.value( "Count", BooleanOperation::Count );

	enum_<BooleanResultMapper::MapObject>( "BooleanResultMapObject" )
		.value( "A", BooleanResultMapper::MapObject::A )
		.value( "B", BooleanResultMapper::MapObject::B )
		.value( "Count", BooleanResultMapper::MapObject::Count );


	class_<BooleanResultMapper::Maps>( "BooleanResultMaps" )
		.constructor<>()
		.property( "cut2origin", &BooleanResultMapper::Maps::cut2origin )
		.property( "cut2newFaces", &BooleanResultMapper::Maps::cut2newFaces )
		.property( "old2newEdges", &BooleanResultMapper::Maps::old2newEdges )
		.property( "old2newVerts", &BooleanResultMapper::Maps::old2newVerts );

	class_<BooleanInternalParameters>( "BooleanInternalParameters" )
		.constructor<>()
		.property( "originalMeshA", &BooleanInternalParameters::originalMeshA, allow_raw_pointers() )
		.property( "originalMeshB", &BooleanInternalParameters::originalMeshB, allow_raw_pointers() )
		.property( "optionalOutCut", &BooleanInternalParameters::optionalOutCut, allow_raw_pointers() );


	class_<BooleanResultMapper>( "BooleanResultMapper" )
		.constructor<>()
		.function( "map", select_overload<FaceBitSet( const FaceBitSet&, BooleanResultMapper::MapObject ) const>( &BooleanResultMapper::map ) )
		.function( "mapFaces", select_overload<FaceBitSet( const FaceBitSet&, BooleanResultMapper::MapObject ) const>( &BooleanResultMapper::map ) )
		.function( "mapVerts", select_overload<VertBitSet( const VertBitSet&, BooleanResultMapper::MapObject ) const>( &BooleanResultMapper::map ) )
		.function( "mapEdges", select_overload<EdgeBitSet( const EdgeBitSet&, BooleanResultMapper::MapObject ) const>( &BooleanResultMapper::map ) )
		.function( "newFaces", &BooleanResultMapper::newFaces )
		.function( "filteredOldFaceBitSet", &BooleanResultMapper::filteredOldFaceBitSet )
		.function( "getMaps", &BooleanResultMapper::getMaps );


	/// \note: actually this function is meant to be internal, use `boolean()` instead
	function( "doBooleanOperation", &doBooleanOperation, allow_raw_pointers() );
}
