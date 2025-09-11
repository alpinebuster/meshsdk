cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(cmake-c-examples C)

find_package(MeshLib CONFIG REQUIRED)

set(EXAMPLES
  FreeFormDeformation
  GlobalRegistration
  LaplacianDeformation
  MeshBoolean
  MeshDecimate
  MeshExport
  MeshExtrude
  MeshFillHole
  MeshICP
  MeshLoadSave
  MeshModification
  MeshOffset
  MeshFixDegeneracies
  MeshStitchHole
  NoiseDenoise
  Triangulation
)

foreach(TARGET ${EXAMPLES})
  add_executable(${TARGET} ${TARGET}.dox.c)
  target_include_directories(${TARGET} PUBLIC ${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
  target_link_libraries(${TARGET} PRIVATE MeshLib::MeshLibC2)
  target_link_directories(${TARGET} PRIVATE ${MESHSDK_THIRDPARTY_LIB_DIR})
endforeach()
# Triangulation requires the math library
target_link_libraries(Triangulation PRIVATE m)
