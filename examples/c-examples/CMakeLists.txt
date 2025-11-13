cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(cmake-c-examples C)

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
  add_executable(${TARGET} ${TARGET}.dox.c)
endforeach()

if(DEFINED MESHSDK_INCLUDE_DIRS AND DEFINED MESHSDK_LIB_DIRS)
  # for distributions without CMake config files
  foreach(TARGET ${EXAMPLES})
    target_include_directories(${TARGET} PUBLIC ${MESHSDK_INCLUDE_DIRS})
    target_link_directories(${TARGET} PUBLIC ${MESHSDK_LIB_DIRS})
    target_link_libraries(${TARGET} PRIVATE MeshSDKC2)
  endforeach()
else()
  find_package(MeshSDK CONFIG REQUIRED)
  
  foreach(TARGET ${EXAMPLES})
    target_include_directories(${TARGET} PUBLIC ${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
    target_link_directories(${TARGET} PRIVATE ${MESHSDK_THIRDPARTY_LIB_DIR})
    target_link_libraries(${TARGET} PRIVATE MeshSDK::MeshSDKC2)
  endforeach()
endif()

if(NOT MSVC)
  # Triangulation requires the math library
  target_link_libraries(Triangulation PRIVATE m)
endif()
