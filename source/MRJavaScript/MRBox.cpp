#include <vector>
#include <limits>
#include <cmath>
#include <algorithm>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRBox.h>

#include "MRBox.h"

using namespace emscripten;
using namespace MR;

// Helper function for squaring
template<typename T>
T sqr( const T& x )
{
	return x * x;
}


EMSCRIPTEN_BINDINGS( BoxModule )
{
	MRJS::bindTypedBox<Box1f, float>( "Box1f" );
	MRJS::bindTypedBox<Box1i, int>( "Box1i" );
	MRJS::bindTypedBox<Box1i64, Int64>( "Box1i64" );
	MRJS::bindTypedBox<Box1d, double>( "Box1d" );

	
	MRJS::bindTypedBox<Box2f, Vector2f>( "Box2f" );
	MRJS::bindTypedBox<Box2i, Vector2i>( "Box2i" );
	MRJS::bindTypedBox<Box2i64, Vector2i64>( "Box2i64" );
	MRJS::bindTypedBox<Box2d, Vector2d>( "Box2d" );

	
	MRJS::bindTypedBox<Box3f, Vector3f>( "Box3f" );
	MRJS::bindTypedBox<Box3i, Vector3i>( "Box3i" );
	MRJS::bindTypedBox<Box3i64, Vector3i64>( "Box3i64" );
	MRJS::bindTypedBox<Box3d, Vector3d>( "Box3d" );
}
