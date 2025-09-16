#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRSymMatrix2.h>
#include <MRMesh/MRSymMatrix3.h>
#include <MRMesh/MRQuadraticForm.h>

#include "MRQuadraticForm.h"

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( QuadraticFormModule )
{
    MRJS::bindTypedQuadraticForm<QuadraticForm2f, Vector2f, float>( "QuadraticForm2f" );
    MRJS::bindTypedQuadraticForm<QuadraticForm2d, Vector2d, double>( "QuadraticForm2d" );
    MRJS::bindTypedQuadraticForm<QuadraticForm3f, Vector3f, float>( "QuadraticForm3f" );
    MRJS::bindTypedQuadraticForm<QuadraticForm3d, Vector3d, double>( "QuadraticForm3d" );

    MRJS::bindSumFunctions<Vector2f>( "QuadraticForm2f" );
    MRJS::bindSumFunctions<Vector2d>( "QuadraticForm2d" );
    MRJS::bindSumFunctions<Vector3f>( "QuadraticForm3f" );
    MRJS::bindSumFunctions<Vector3d>( "QuadraticForm3d" );
}
