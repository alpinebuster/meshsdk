#include <algorithm>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRPointToPointAligningTransform.h>
#include <MRMesh/MRPointToPlaneAligningTransform.h>
#include <MRMesh/MRMultiwayAligningTransform.h>
#include <MRMesh/MRAABBTreeObjects.h>
#include <MRMesh/MRMultiwayICP.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MultiwayICPModule )
{
}
