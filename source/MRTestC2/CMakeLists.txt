project(MRTestC2 C)

file(GLOB HEADERS "*.h")
file(GLOB SOURCES "*.c")

add_executable(${PROJECT_NAME} ${HEADERS} ${SOURCES})

target_include_directories(${PROJECT_NAME} PRIVATE ../MeshSDKC2/include)

target_link_libraries(${PROJECT_NAME} PRIVATE
  MeshSDKC2
)
IF(NOT WIN32)
  target_link_libraries(${PROJECT_NAME} PRIVATE m)
ENDIF()

add_test(
  NAME ${PROJECT_NAME}
  COMMAND ${PROJECT_NAME}
)
