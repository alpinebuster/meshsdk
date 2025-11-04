cmake_minimum_required(VERSION 3.16 FATAL_ERROR)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(cpp-examples CXX)

find_package(MeshSDK CONFIG REQUIRED)
find_package(TBB REQUIRED)
find_package(Threads)

set(EXAMPLES
  Collision
  CollisionPrecise
  CollisionSelf
  ContourTriangulation
  FreeFormDeformation
  Fusion
  GlobalRegistration
  LaplacianDeformation
  MeshBoolean
  MeshDecimate
  MeshExport
  MeshExtrude
  MeshFillHole
  MeshFixDegeneracies
  MeshFromText
  MeshICP
  MeshLoadSave
  MeshModification
  MeshOffset
  MeshOffsetWeighted
  MeshStitchHole
  NoiseDenoise
  PointsToMesh
  SignedDistance
  SignedDistancePointToMesh
  SignedDistances
  TerrainTriangulation
  Triangulation
)

foreach(TARGET ${EXAMPLES})
  add_executable(${TARGET} ${TARGET}.dox.cpp)
  target_include_directories(${TARGET} PUBLIC ${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
  target_link_directories(${TARGET} PUBLIC ${MESHSDK_THIRDPARTY_LIB_DIR})
  target_link_libraries(${TARGET} PRIVATE MeshSDK::MRMesh TBB::tbb)
endforeach()
# MeshFromText additionally depends on MRSymbolMesh
target_link_libraries(MeshFromText PRIVATE MeshSDK::MRSymbolMesh)
# MeshOffset and Triangulation additionally depend on MRVoxels
target_link_libraries(Fusion PRIVATE MeshSDK::MRVoxels)
target_link_libraries(MeshOffset PRIVATE MeshSDK::MRVoxels)
target_link_libraries(MeshOffsetWeighted PRIVATE MeshSDK::MRVoxels)
target_link_libraries(Triangulation PRIVATE MeshSDK::MRVoxels)
# MeshLoadSave additionally depends on MRIOExtras
target_link_libraries(MeshLoadSave PRIVATE MeshSDK::MRIOExtras)

add_executable(MRBasedMainFunc MRBasedMainFunc.dox.cpp)
target_include_directories(MRBasedMainFunc PUBLIC ${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
target_link_directories(MRBasedMainFunc PUBLIC ${MESHSDK_THIRDPARTY_LIB_DIR})
target_link_libraries(MRBasedMainFunc PRIVATE MeshSDK::MRMesh MeshSDK::MRViewer)
if(APPLE)
  find_package(Boost CONFIG REQUIRED)
  target_link_libraries(MRBasedMainFunc PRIVATE Boost::headers)
endif()
if(EMSCRIPTEN)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${MESHSDK_EMSCRIPTEN_CXX_FLAGS}")
  set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS}")
endif()
