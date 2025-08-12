#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRPointCloud.h>
#include <MRMesh/MRPointCloudPart.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( PointCloudPartModule )
{
    class_<PointCloudPart>( "PointCloudPart" )
        .constructor<const MR::PointCloud&>()
        .constructor<const MR::PointCloud&, const MR::VertBitSet*>( allow_raw_pointers() )

        .function( "getCloud", optional_override( [] ( const PointCloudPart& self ) -> const PointCloud&
        {
            return self.cloud;
        } ) )
        .function( "getRegion", optional_override( [] ( const PointCloudPart& self ) -> const VertBitSet*
        {
            return self.region;
        } ), allow_raw_pointers() )

        .function( "equals", &MR::PointCloudPart::operator=, allow_raw_pointers() );
}
