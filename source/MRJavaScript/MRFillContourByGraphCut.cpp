#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MREdgeMetric.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRSurroundingContour.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRFillContourByGraphCut.h>

#include "MRUtils.h"
#include "MRFillContourByGraphCut.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( FillContourByGraphCutModule )
{
	///
	function( "fillContourLeftByGraphCut", select_overload<FaceBitSet (const MeshTopology &, const EdgePath &, const EdgeMetric &, const ProgressCallback&)>( &fillContourLeftByGraphCut ) );
	function( "fillContourLeftByGraphCutByContours", select_overload<FaceBitSet (const MeshTopology &, const std::vector<EdgePath> &, const EdgeMetric &, const ProgressCallback&)>( &fillContourLeftByGraphCut ) );
	function( "segmentByGraphCut", &segmentByGraphCut );
	///
}
