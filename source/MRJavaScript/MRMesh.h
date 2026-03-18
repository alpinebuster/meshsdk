#pragma once

#include <vector>
#include <limits>
#include <exception>
#include <string>

#include <emscripten/val.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRMeshProject.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRVectorTraits.h>

#include <MRVoxels/MROffset.h>

#include "MRMesh.h"

using namespace MR;
using emscripten::val;

namespace MRJS
{

} // namespace MRJS
