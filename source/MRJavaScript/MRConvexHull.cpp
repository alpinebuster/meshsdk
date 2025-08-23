#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRPointCloud.h>
#include <MRMesh/MRLine3.h>
#include <MRMesh/MRPlane3.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRHeap.h>
#include <MRMesh/MRMeshFixer.h>
#include <MRMesh/MRMeshBuilder.h>
#include <MRMesh/MRConvexHull.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( ConvexHullModule )
{
	function( "makeConvexHull", select_overload<Mesh ( const Mesh& )>( &makeConvexHull ) );
	function( "makeConvexHullWithVertCoords", select_overload<Mesh ( const VertCoords&, const VertBitSet&)>( &makeConvexHull ) );
	function( "makeConvexHullWithPointsCloud", select_overload<Mesh (const PointCloud& )>( &makeConvexHull ) );
	function( "makeConvexHullWithContour2f", select_overload<Contour2f (Contour2f)>( &makeConvexHull ) );
}
