# Generating the bindings

[Installing prerequisites](#installing-prerequisites) — [Generating bindings](#generating-bindings) — [Troubleshooting](#troubleshooting-python-bindings)

## Installing prerequisites

Run **`scripts/mrbind/install_deps_<platform>`** to install the dependencies (on Linux and MacOS - as root), then **`scripts/mrbind/install_mrbind_<platform>`** to build MRBind (not at root). MRBind is our bindings generator.

You can re-run those scripts to update the dependencies and/or MRBind itself.

Among other things, the scripts do following:

* On Ubuntu, they may add [the LLVM repository](https://apt.llvm.org/) to install the specific version of Clang and libclang that we want.

* On Windows, install MSYS2 to `C:\msys64_meshsdk_mrbind`, and install Clang there.

More details on what the scripts do on different platforms:

<details><summary><b>Windows</b></summary>

* **Installing dependencies:**

    On Windows we use MSYS2, because it provides prebuilt libclang and provides GNU Make to run our makefile.

    MSYS2 is a package manager, roughly speaking. They provide a bunch of MinGW-related packages (compilers and prebuilt libraries). Luckily Clang can always cross-compile, so MSYS2's MinGW Clang can produce MSVC-compatible executables with the correct flags. You still need to have VS installed though, since it will use its libraries.

    We use the [MSYS2 CLANG64](https://www.msys2.org/docs/environments/) environment. Consult `install_deps_windows_msys2.bat` for the list of packages we install in it.

    We don't use the latest Clang version, instead we download and install the version specified in `clang_version_msys2.txt`.

* **Building MRBind:**

    MRBind source code is at https://github.com/MeshInspector/mrbind/.

    We build MRBind at `thirdparty/mrbind/build`, but you can build it [elsewhere](#less-common-flags) manually.

    We build in the [MSYS2 CLANG64](https://www.msys2.org/docs/environments/) environment, using MSYS2's Clang. Other compilers are not guaranteed to work.


</details>

### Ubuntu

* Run `sudo scripts/mrbind/install_deps_ubuntu.sh`

<details><summary>What does this do?</summary>

This installs Clang. If the required version is missing in the stock repositories, it will add [the LLVM repository](https://apt.llvm.org/).

</details>

### MacOS

* Ensure you have [`brew`](https://brew.sh/) installed.

* Run `sudo scripts/mrbind/install_deps_macos.sh`

<details><summary>What does this do?</summary>

This uses Brew to install Clang and some other packages.

</details>

## Generating bindings

Target languages:

* **Python** (`TARGET=python`): Build MeshSDK first, then run the generator script, which will both generate the sources and build them.

  This is the default target language, if `TARGET=...` is not specified.

* **C** (`TARGET=c`): Run the generator script first, which will generate the sources, but not build them. *Then* build MeshSDK along with the freshly generated bindings. Building C bindings is only supported with CMake, not MSBuild. Pass `-DMESHSDK_BUILD_GENERATED_C_BINDINGS=ON` to CMake to build the bindings (in addition to the rest of MeshSDK). The generated bindings are human-readable and are located in `source/MeshSDKC2`.

* **C#** (`TARGET=csharp`): Must *generate* the C bindings before C# (to produce the JSON describing their contents), but you can *build* them after C# if you prefer. Running the generator script for C# will both generate the C# sources and build them.

Platform specifics:

* **Windows:** Run `scripts\mrbind\generate_win.bat -B --trace TARGET=...` from the VS developer command prompt (use the `x64 Native` one!).

  When generating the Python bindings, the current directory matters, as this will look for MeshSDK in `./source/x64/Release`. Add `VS_MODE=Debug` at the end if you built MeshSDK in debug mode, the default is `VS_MODE=Release`. (Ignored for C#.)

  The `generate_win.bat` file merely calls `generate.mk` (see below) inside of the MSYS2 shell. You can use that directly if you prefer.

* **Linux:** `make -f scripts/mrbind/generate.mk -B --trace`

  This will look for MeshSDK in `./build/Release/bin`. Pass `MESHSDK_SHLIB_DIR=path/to/bin` for a different directory. (Ignored for C#.)

* **MacOS:** Same as on Linux, but before running the command you must adjust the PATH: `export PATH="$(brew --prefix)/opt/make/libexec/gnubin:$PATH"`. (`brew --prefix` appears to default to `/opt/homebrew` on Arm and `/usr/local` on x86.). This adds the version of Make installed in Homebrew to PATH, because the default one is outdated. Confirm the version with `make --version`, it must be 4.x or newer.

### Tunable flags for the generation script

* **`--trace` — enable verbose logs.** Remove to get quieter logs.

* **`-B` — force a full rebuild of the bindings.** Incremental builds are not very useful, because they're not perfect and can miss changes. Use incremental builds only e.g. when you're fixing linker errors.

* **`MODE=...` — optimization** setting for the Python module:

  * `release` (default) — Enable optimization, disable debug symbols. Same as what goes into the production.

  * `debug` — disable optimizations, enable debug symbols. Use this to debug the bindings.

  * `none` — neither enable optimizations nor enable the debug symbols. This gives the fastest build times, useful for testing bindings locally.

  You can also et entirely custom C++ compiler flags, by setting `EXTRA_CFLAGS` and `EXTRA_LDFLAGS`.

  The `EXTRA_...` flags are ignored for C#, and `MODE=none` is replaced with `MODE=debug` there.

* **`NUM_FRAGMENTS=?? -j??` — adjust RAM usage vs build speed tradeoff.**

  If you're running out of RAM, reduce `-j...`.

  `NUM_FRAGMENTS=??` is how many translation units the bindings are split into. `-j??` is the number of parallel build threads/processes. We have some heuristics to guess good values for this, they are printed when the script starts.

  Guessing the fastest combination isn't trivial. Usually you want to maximize threads (up to the number of cores), and then minimize the number of fragments as much as your RAM allows. The number of fragments should normally be a multiple of the number of threads.

* **`PYTHON_PKGCONF_NAME=python-3.??-embed` — select Python version.** We try to guess this one. You can set this to `python3-embed` to use whatever your OS considers to be the default version.

### Selecting the compiler:

For simplicity, we compile the Python bindings with the same Clang that we use for parsing the code. (Consult `clang_version.txt` for the current version.) But you can override this using `CXX_FOR_BINDINGS`.

`CXX_FOR_BINDINGS` has an additional use that matters for both Python and C. We use it to locate the "Clang resource directory", which the parser needs. The variable must be set to the same version of Clang that provides libclang that was used to build MRBind, otherwise you might get compatibility issues. But normally we should be able to guess the value of this variable, so normally you don't have to think abou tthis.

**ABI compatibility (Python only):** Since MeshSDK is compiled using a different compiler, we must ensure the two use the same ABI. `CXX_FOR_ABI` should be set to the compiler the ABI of which we're trying to match. (Defaults to `CXX` environment variable, or `g++` if not set.) At the moment, if `CXX_FOR_ABI` is GCC 13 or older or Clang 17 or older (note that Apple Clang uses a [different version numbering scheme](https://en.wikipedia.org/wiki/Xcode#Xcode_15.0_-_(since_visionOS_support)_2)), we pass `-fclang-abi-compat=17` to our Clang 18 or newer. This flag *disables* mangling `requires` constraints into function names. If we guess incorrectly, you'll get undefined references to functions with `requires` constraints on them.

### Less common flags:

* **Selecting MRBind installation:** if you installed MRBind to a non-default location (`MeshSDK/mrbind`), you must pass this location to `MRBIND_SOURCE=path/to/mrbind`.

    Additionally, if the MRBind binary is not at `$MRBIND_SOURCE/build/mrbind`, you must pass `MRBIND_EXE=...` (path to the executable itself, not its directory).

You can find some undocumented flags/variables in `generate.mk`.

## Troubleshooting Python bindings

* **`could not open 'MRMesh.lib': No such file or directory`**

  * MeshSDK wasn't built, or `VS_MODE` is set incorrectly.

* **`machine type x86 conflicts with x64`**

  * You opened `x86 ...` VS developer command prompt, but we need `x64 Native`. Rebuild the bindings in x64 prompt.

* **`undefined symbol: void __cdecl std::_Literal_zero_is_expected(void)`**

  * Update your VS 2022.

* **Undefined references to MeshSDK functions**.

  * This can only happen on Linux/Mac. If you look at the offending functions in the headers, they should have `requires` on them.

  * You likely used a non-default compiler when compiling MeshSDK. Pass this compiler to `CXX_FOR_ABI=...` when generating Python bindings to fix the issue (e.g. `CXX_FOR_ABI=clang++-22` or `g++-15`).

    MeshSDK is usually compiled using a different compiler than the Python bindings (for the bindings we use a specific version of Clang, the same that is used by the parser; using the same compiler for the bindings on all platforms makes writing them easier). Therefore, we must ensure that the two compilers use the same ABI. `CXX_FOR_ABI` should be set to the compiler the ABI of which we're trying to match. (Defaults to `CXX` environment variable, or `g++` if not set.) At the moment, if `CXX_FOR_ABI` is GCC 13 or older or Clang 17 or older (note that Apple Clang uses a [different version numbering scheme](https://en.wikipedia.org/wiki/Xcode#Xcode_15.0_-_(since_visionOS_support)_2)), we pass `-fclang-abi-compat=17` to our Clang 18 or newer (which is used to compile the bindings). This flag *disables* mangling of `requires` constraints into function names. If we guess incorrectly, you'll get undefined references to functions with `requires` constraints on them.

* **Importing the wheel segfaults on MacOS**

  * Make sure you're not linking against Python **and** make sure you use `-Xlinker -undefined -Xlinker dynamic_lookup` linker flags. The `generate.mk` should already do it correctly, but just keep this in mind. Also transitively linking Python seems to be fine (`-lMRPython` is fine).

    Failure to do this will have no effect when importing the module directly, but will segfault when importing it as a wheel, **or** when using a wrong Python version even without the wheel.

* **`cannot initialize type "expected_...": an object with that name is already defined`**

  Likely a conflict between `std::expected` and `tl::expected` (probably MRMesh ended up using the latter while MRBind is using the former). Try `EXTRA_CFLAGS='-DMB_PB11_ALLOW_STD_EXPECTED=0 -DMR_USE_STD_EXPECTED=0'` to make MRBind switch to `tl::expected`.

* **`lld-link: error: undefined symbol: void __cdecl std::_Literal_zero_is_expected(void)`**,
`>>> referenced by source/TempOutput/PythonBindings/x64/Release/binding.0.o:(public: __cdecl std::_Literal_zero::_Literal_zero<int>(int))`

  * This seems to be a VS2022 bug that's triggered by trying to bind `operator<=>` (taking its address?). We work around this by banning all `operator<=>`s with `--ignore`, see `mrbind_flags.txt`.

## 3.2. Generate C bindings

Running our script generates the code for the bindings, at `source/MeshSDKC2` and `source/MeshSDKC2Cuda`.

Then you must build MeshSDK with a special CMake flag, which will build the generated bindings.

### Windows

* Open the `x64 Native Tools Command Prompt for VS` terminal in the Start menu.

* There, run <code>scripts\mrbind\generate_win.bat -B --trace TARGET=c</code>

* Compile MeshSDK using CMake, with flag `-DMESHSDK_BUILD_GENERATED_C_BINDINGS=ON` to also compile the generated bindings.<br/>
  Compiling bindings using Visual Studio is not supported, you must use CMake.

### Linux

* Run <code>make -f scripts\mrbind\generate.mk -B --trace TARGET=c</code>

* Compile MeshSDK using CMake, with flag `-DMESHSDK_BUILD_GENERATED_C_BINDINGS=ON` to also compile the generated bindings.<br/>

### MacOS

* Run `export PATH="$(brew --prefix)/opt/make/libexec/gnubin:$PATH"` to temporarily add a newer version of GNU Make to the PATH (now `make --version` should report 4.x or newer).

* Run <code>make -f scripts\mrbind\generate.mk -B --trace TARGET=c</code>

* Compile MeshSDK using CMake, with flag `-DMESHSDK_BUILD_GENERATED_C_BINDINGS=ON` to also compile the generated bindings.<br/>

### Tunable flags for the generation script

* **`ENABLE_CUDA=??` — enable or disable Cuda.** If you're building MeshSDK without Cuda support, pass `ENABLE_CUDA=0` to skip the Cuda bindings too. It defaults to `1` everywhere except MacOS, where Cuda doesn't work.

  When this is disabled, a stub Cuda bindings are still generated, with a single function that reports that Cuda is not available.

## 3.3. Generate C# bindings

You must [generate C bindings first](#32-generate-c-bindings), then continue from here.

To generate and build C# bindings, it's enough to generate C bindings without building them. But to actually run programs using the C# bindings, you must build the C bindings. You can do this in any order.

The steps below both generate the C# code (at `MeshSDK/source/MRDotNet2`) and compile it.

### Windows

* Run <code>scripts\mrbind\generate_win.bat -B --trace TARGET=csharp</code>

* Locally running C# programs wasn't tested on this OS. You might need to copy the DLLs of the C bindings somewhere C# can find them.

### Linux

* Run <code>make -f scripts\mrbind\generate.mk -B --trace TARGET=csharp</code>

* To locally run C# programs that use our C# bindings, you might need to set environment variable `LD_LIBRARY_PATH=...` to the directory that contains `libMRMesh.so` when running your programs.

### MacOS

* Run `export PATH="$(brew --prefix)/opt/make/libexec/gnubin:$PATH"` to temporarily add a newer version of GNU Make to the PATH (now `make --version` should report 4.x or newer).

* Run <code>make -f scripts\mrbind\generate.mk -B --trace TARGET=csharp</code>

* Locally running C# programs wasn't tested on this OS. You might need to set environment variable `DYLD_LIBRARY_PATH=...` to the directory that contains `libMRMesh.dylib` when running your programs.

### Tunable generator flags

* **`MODE=??` — C# optimization mode.** Defaults to `release`, you can also pass `debug`.<br/>
  Most of the time this doesn't matter, since consuming C# bindings from another C# project will automatically rebuild them in the right mode (the one you use when building your project).

## 4. Other information

### Less common flags for the generator script

* **Selecting MRBind installation:** if you installed MRBind to a non-default location (the default is `./MeshSDK/mrbind`), you must pass this location to `MRBIND_SOURCE=path/to/mrbind`.

    Additionally, if the MRBind binary is not at `$MRBIND_SOURCE/build/mrbind`, you must pass `MRBIND_EXE=...` (path to the executable itself, not its directory).

You can find more undocumented flags/variables in `generate.mk`.
