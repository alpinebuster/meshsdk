#include <MRPch/MRWasm.h>

#include <MRMesh/MRMesh.h>
#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRRingIterator.h>
#include <MRMesh/MRTriMath.h>
#include <MRMesh/MRLine3.h>
#include <MRMesh/MRMeshIntersect.h>
#include <MRMesh/MRMeshTopology.h>
#include <MRMesh/MRBox.h>
#include <MRMesh/MRBitSet.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRMeshPart.h>
#include <MRMesh/MRRegionBoundary.h>
#include <MRMesh/MRExpandShrink.h>
#include <MRMesh/MRMeshDecimate.h>
#include <MRMesh/MREdgePaths.h>
#include <MRMesh/MRMeshSubdivide.h>
#include <MRMesh/MRProgressCallback.h>
#include <MRMesh/MRExpected.h>
#include <MRMesh/MRMeshFixer.h>

using namespace emscripten;
using namespace MR;


EMSCRIPTEN_BINDINGS( MeshFixerModule )
{
    function( "duplicateMultiHoleVertices", &duplicateMultiHoleVertices );
    function( "findMultipleEdges", &findMultipleEdges );
    function( "hasMultipleEdges", &hasMultipleEdges );

    function( "fixMultipleEdgesByGroup", select_overload<void( Mesh&, const std::vector<MultipleEdge>& )>( &fixMultipleEdges ) );
    function( "fixMultipleEdges", select_overload<void( Mesh& )>( &fixMultipleEdges ) );

    function( "findDegenerateFaces", &findDegenerateFaces );
    function( "findShortEdges", &findShortEdges );


    class_<FixMeshDegeneraciesParams>( "FixMeshDegeneraciesParams" )
        .constructor<>()
        .property( "maxDeviation", &FixMeshDegeneraciesParams::maxDeviation )
        .property( "tinyEdgeLength", &FixMeshDegeneraciesParams::tinyEdgeLength )
        .property( "criticalTriAspectRatio", &FixMeshDegeneraciesParams::criticalTriAspectRatio )
        .property( "maxAngleChange", &FixMeshDegeneraciesParams::maxAngleChange )
        .property( "stabilizer", &FixMeshDegeneraciesParams::stabilizer )
        .property( "region", &FixMeshDegeneraciesParams::region, allow_raw_pointers() )
        .property( "mode", &FixMeshDegeneraciesParams::mode )
        .property( "cb", &FixMeshDegeneraciesParams::cb );

    enum_<FixMeshDegeneraciesParams::Mode>( "FixMeshDegeneraciesMode" )
        .value( "Decimate", FixMeshDegeneraciesParams::Mode::Decimate )
        .value( "Remesh", FixMeshDegeneraciesParams::Mode::Remesh )
        .value( "RemeshPatch", FixMeshDegeneraciesParams::Mode::RemeshPatch );


    function( "fixMeshDegeneracies", &fixMeshDegeneracies );
    function( "findNRingVerts", &findNRingVerts, allow_raw_pointers() );
    function( "isEdgeBetweenDoubleTris", &isEdgeBetweenDoubleTris );
    function( "eliminateDoubleTris", &eliminateDoubleTris, allow_raw_pointers() );
    function( "eliminateDoubleTrisAround", &eliminateDoubleTrisAround, allow_raw_pointers() );
    function( "isDegree3Dest", &isDegree3Dest );
    function( "eliminateDegree3Dest", &eliminateDegree3Dest, allow_raw_pointers()  );
    function( "eliminateDegree3Vertices", &eliminateDegree3Vertices, allow_raw_pointers()  );
    function( "isVertexRepeatedOnHoleBd", &isVertexRepeatedOnHoleBd );
    function( "findRepeatedVertsOnHoleBd", &findRepeatedVertsOnHoleBd );
    function( "findHoleComplicatingFaces", &findHoleComplicatingFaces );


    class_<FixCreasesParams>( "FixCreasesParams" )
        .constructor<>()
        .property( "creaseAngle", &FixCreasesParams::creaseAngle )
        .property( "criticalTriAspectRatio", &FixCreasesParams::criticalTriAspectRatio )
        .property( "maxIters", &FixCreasesParams::maxIters );


    function( "fixMeshCreases", &fixMeshCreases );


    class_<FindDisorientationParams>( "FindDisorientationParams" )
        .constructor<>()
        .property( "mode", &FindDisorientationParams::mode )
        .property( "virtualFillHoles", &FindDisorientationParams::virtualFillHoles )
        .property( "cb", &FindDisorientationParams::cb );

    enum_<FindDisorientationParams::RayMode>( "RayMode" )
        .value( "Positive", FindDisorientationParams::RayMode::Positive )
        .value( "Shallowest", FindDisorientationParams::RayMode::Shallowest )
        .value( "Both", FindDisorientationParams::RayMode::Both );


    /**
     * Find faces with suspicious orientation
     * 
     * --------------- EXAMPLE USAGE ---------------
     * 
     *    // 1. Load STL
     *    auto meshOpt = loadMesh( "18.stl" );
     *    if ( !meshOpt )
     *    {
     *        std::cerr << "Failed to load mesh\n";
     *        return 1;
     *    }
     *    Mesh mesh = std::move( *meshOpt );
     *
     *    // 2. Find faces with flipped (disoriented ) normals
     *    FaceBitSet disorientedFaces = findDisorientedFaces( mesh );
     *
     *    // 3. Extract those faces into a new mesh and flip them
     *    Mesh separateDisorientedPart;
     *    separateDisorientedPart.addPart( mesh, disorientedFaces );
     *    separateDisorientedPart.topology.flipOrientation();
     *
     *    // 4. Remove those reversed (disoriented ) faces from the original mesh
     *    mesh.deleteFaces( disorientedFaces );
     *
     *    // 5. Re-add the flipped faces (they will be joined but not connected)
     *    mesh.addPart( separateDisorientedPart );
     *
     *    // 6. Rebuild mesh with corrected disorientation to connect all together and fix issues
     *    RebuildMeshSettings rSettings;
     *    rSettings.voxelSize = suggestVoxelSize( mesh, 1e8f );
     *    mesh = rebuildMesh( mesh, rSettings );
     *
     *    // 7. Optional: remove isolated components with area too small
     *    auto largeComps = MeshComponents::getLargeByAreaComponents(
     *        mesh, mesh.area() * 0.002, nullptr );
     *    mesh.deleteFaces( mesh.topology.getValidFaces() - largeComps );
     *
     *    // 8. Save STL
     *    saveMesh( mesh, "res_mesh.stl" );
     * 
     */
    function( "findDisorientedFaces", &findDisorientedFaces );
}
