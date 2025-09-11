cmake_minimum_required(VERSION 3.16 FATAL_ERROR)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(cpp-samples CXX)

find_package(MeshLib CONFIG REQUIRED)
find_package(TBB REQUIRED)

set(SAMPLES
  GlobalRegistration
  LaplacianDeformation
)

foreach(TARGET ${SAMPLES})
  add_executable(${TARGET} ${TARGET}.cpp)
  target_include_directories(${TARGET} PUBLIC ${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
  target_link_libraries(${TARGET} PRIVATE MeshLib::MRMesh TBB::tbb)
  target_link_directories(${TARGET} PUBLIC ${MESHSDK_THIRDPARTY_LIB_DIR})
endforeach()
