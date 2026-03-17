cmake_minimum_required(VERSION 3.16 FATAL_ERROR)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

project(example_plugin CXX)

if(EMSCRIPTEN)
    set(HTML_DIR "${CMAKE_BINARY_DIR}/html")
    # place built Wasm/JS files to `html' directory
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${HTML_DIR})
endif()

find_package(MeshSDK REQUIRED)
include_directories(${MESHSDK_INCLUDE_DIR} ${MESHSDK_THIRDPARTY_INCLUDE_DIR})
link_directories(${MESHSDK_THIRDPARTY_LIB_DIR})

add_library(MyPlugin MyPlugin.cpp)
target_link_libraries(MyPlugin
    PRIVATE
        MeshSDK::MRViewer
)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${MESHSDK_EMSCRIPTEN_CXX_FLAGS}")

if(CMAKE_SOURCE_DIR STREQUAL CMAKE_CURRENT_SOURCE_DIR)
    add_executable(ViewerApp ViewerApp.cpp)
    if(NOT EMSCRIPTEN)
        target_link_libraries(ViewerApp
            PRIVATE
                MeshSDK::MRViewer
        )
    else()
        # libraries and plugins must be linked with `--whole-archive' option for correct auto-initialization
        target_link_libraries(ViewerApp
            PRIVATE
                -Wl,--whole-archive
                MeshSDK::MRViewer
                MeshSDK::MRIOExtras
                MeshSDK::MRCommonPlugins
                MyPlugin
                -Wl,--no-whole-archive
        )
        set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS}")

        # place HTML/JS files to `html' directory
        file(GLOB MESHSDK_WASM_FILES "${MESHSDK_DATA_DIR}/wasm/*.*")
        file(
            COPY ${MESHSDK_WASM_FILES}
            DESTINATION ${HTML_DIR}
        )
        # overwrite index.html file
        file(COPY_FILE wasm/index.html ${HTML_DIR}/index.html)

        # pack assets
        file(GLOB MESHSDK_JSONS "${MESHSDK_DATA_DIR}/*.json")
        file(GLOB MESHSDK_FONTS "${MESHSDK_DATA_DIR}/fonts/*.*")
        file(GLOB LOCAL_JSONS   "${CMAKE_CURRENT_SOURCE_DIR}/*.json")
        file(
            COPY
                ${MESHSDK_DATA_DIR}/resource
                ${MESHSDK_JSONS}
                ${MESHSDK_FONTS}
                resource
                ${LOCAL_JSONS}
            DESTINATION "${HTML_DIR}/assets"
        )
        mr_emscripten_pack_directory("${HTML_DIR}/assets" "/")

        # enable Asyncify
        mr_emscripten_set_async_func_list("${MESHSDK_DATA_DIR}/wasm/wasm_async_func_list.txt")
    endif()
endif()
