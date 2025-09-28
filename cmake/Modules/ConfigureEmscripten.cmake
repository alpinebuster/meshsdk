# reference: https://github.com/emscripten-core/emscripten/blob/main/src/settings.js
string(JOIN " " MESHSDK_EMSCRIPTEN_CXX_FLAGS
  "--use-port=boost_headers"
  "--use-port=freetype" # TODO: make optional
  "--use-port=libpng" # TODO: make optional
  "--use-port=zlib" # TODO: make optional
)
string(JOIN " " MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS
  "-s EXPORTED_RUNTIME_METHODS=[ccall]"
  "-s ALLOW_MEMORY_GROWTH=1"
  "-s LLD_REPORT_UNDEFINED=1"
  "-s USE_WEBGL2=1"
  "-s USE_GLFW=3"
  "-s FULL_ES3=1"
)

IF(MR_EMSCRIPTEN_SINGLETHREAD)
  set(MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS "${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS} -s ENVIRONMENT=web,node")
ELSE()
  string(JOIN " " MESHSDK_EMSCRIPTEN_CXX_FLAGS ${MESHSDK_EMSCRIPTEN_CXX_FLAGS}
    "-pthread"
    # look https://github.com/emscripten-core/emscripten/issues/8287
    "-Wno-pthreads-mem-growth"
  )

  # uncomment to enable source map for debugging in browsers (slow)
  #set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -gsource-map")

  IF(MR_EMSCRIPTEN_WASM64)
    set(MAXIMUM_MEMORY 16GB) # wasm-ld: maximum memory [...] cannot be greater than 17179869184
  ELSE()
    set(MAXIMUM_MEMORY 4GB)
  ENDIF()
  string(JOIN " " MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS ${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS}
    ###
    # REF: `https://emscripten.org/docs/tools_reference/settings_reference.html#environment`
    # 
    # ‘web’ - the normal web environment
    # ‘webview’ - just like web, but in a webview like Cordova; considered to be same as “web” in almost every place
    # ‘worker’ - a web worker environment
    # ‘node’ - Node.js
    # ‘shell’ - a JS shell like d8, js, or jsc
    #
    "-s ENVIRONMENT=web,worker,node"
    ###
  
    #"-pthread"
    "-s PTHREAD_POOL_SIZE_STRICT=0"
    "-s PTHREAD_POOL_SIZE=navigator.hardwareConcurrency"
    "-s MAXIMUM_MEMORY=${MAXIMUM_MEMORY}"
  )
ENDIF()

IF(NOT MR_DISABLE_EMSCRIPTEN_ASYNCIFY)
  string(JOIN " " MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS ${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS}
    "-s ASYNCIFY"
    # FIXME: comment required
    "-Wno-limited-postlink-optimizations"
  )

  add_compile_definitions(MR_EMSCRIPTEN_ASYNCIFY)
ENDIF()

IF(MR_EMSCRIPTEN_BUILD_DEBUG)
  # REF: `https://emscripten.org/docs/porting/Debugging.html`
  string(JOIN " " CMAKE_EXE_LINKER_FLAGS
    "${CMAKE_EXE_LINKER_FLAGS}"

    "-v" # Display more detailed compilation process information (verbose output)

    # REF: `https://www.willusher.io/blog/build-ship-debug-wasm/`
    "-g3" # DWARF
    "-gsource-map" # Source‑map
    "--source-map-base http://localhost:11009/"

    # REF: `https://emscripten.org/docs/porting/exceptions.html#webassembly-exception-handling-based-support`
    # "-fexceptions"
    # "-fwasm-exceptions"

    # REF: `https://developer.chrome.com/blog/wasm-debugging-2020/#release-builds`
    # "-O0"
    "-O3 -fno-inline"

    # "-gseparate-dwarf=${CMAKE_BINARY_DIR}/bin/meshsdk.dbg.wasm" # Separate DWARF files
    # "-s SEPARATE_DWARF_URL='file://${CMAKE_BINARY_DIR}/bin/meshsdk.dbg.wasm'"
    "-gseparate-dwarf"
    # "-fdebug-compilation-dir=${PROJECT_SOURCE_DIR}"
    "-fdebug-compilation-dir=../../../source"


    # 
    # NOTE:
    # After updating `emcc` to v4.0.11, an error will occur:
    # 
    #   Uncaught RuntimeError: null function or function signature mismatch
    # 
    # More at REF: 
    # 
    # `https://github.com/emscripten-core/emscripten/issues/23952#issuecomment-3000283706` &
    # `https://github.com/emscripten-core/emscripten/issues/19953#issuecomment-1662439751`
    # 
    # "-fsanitize=address"                        # ⚠️
    # "-sEMULATE_FUNCTION_POINTER_CASTS"          # ⚠️
    # 
    # "-Wbad-function-cast -Wcast-function-type"
    
    # REF: `https://emscripten.org/docs/porting/exceptions.html#webassembly-exception-handling-based-support`
    # "-s DISABLE_EXCEPTION_CATCHING=1"

    # "-sASSERTIONS=2" # More runtime assertions
    # "-sASSERTIONS"

    # "-sSTACK_OVERFLOW_CHECK=2" # Stack overflow check
    # "-s SAFE_HEAP=1" # ⚠️ RuntimeError: Aborted(alignment fault)
  )
ENDIF()

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${MESHSDK_EMSCRIPTEN_CXX_FLAGS}")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${MESHSDK_EMSCRIPTEN_EXE_LINKER_FLAGS}")
