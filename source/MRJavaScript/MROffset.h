#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MREnums.h>
#include <MRMesh/MRPositionVertsSmoothly.h>
#include <MRMesh/MRMeshMetrics.h>

#include <MRVoxels/MROffset.h>

#include "MRUtils.h"

using namespace emscripten;
using namespace MR;

namespace MRJS {

val thickenMeshImpl( const Mesh& mesh, float offset, const GeneralOffsetParameters& params );
val thickenMeshFilledImpl( const Mesh& mesh, float offset, bool smooth, const GeneralOffsetParameters& params );
val thickenMeshWithTensionImpl( const Mesh& mesh, float offset, bool smooth, float tension, const GeneralOffsetParameters& params );
val generateOrthodonticBiteImpl( Mesh& meshA, Mesh& meshB, float tension, const InflateSettings& inflateSettings, const GeneralOffsetParameters& params );
val generateOrthodonticBiteWithFillHoleMetricImpl( Mesh& meshA, Mesh& meshB, float tension, const InflateSettings& inflateSettings, GeneralOffsetParameters &params, const FillHoleMetric fillHoleMetric );

} // namespace MRJS
