# Optimized Dockerfile with git submodules and thirdparty build in layers
# Build from project root with: docker compose up --build <service_name>
#
FROM emscripten/emsdk:4.0.10

# Update and install requirements
# Install yaru-theme-icon to fix `Icon 'dialog-warning' not present in theme Yaru: 'glib warning'` while testing
RUN \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    export DEBIAN_FRONTEND=noninteractive; \
    export DEBCONF_NONINTERACTIVE_SEEN=true; \
    echo 'tzdata tzdata/Areas select Etc' | debconf-set-selections; \
    echo 'tzdata tzdata/Zones/Etc select UTC' | debconf-set-selections; \ 
    apt-get update -qqy && \
    apt-get install -qqy --no-install-recommends gpg-agent software-properties-common && \
    echo '\
Package: *\n\
Pin: release o=LP-PPA-mozillateam\n\
Pin-Priority: 1001\
    ' | tee /etc/apt/preferences.d/mozilla-firefox && \
    add-apt-repository -y ppa:mozillateam/ppa && \
    apt-get install -qqy --no-install-recommends \
        tzdata \
        git \
        firefox \
        pkg-config \
        xvfb \
        yaru-theme-icon \
        ninja-build \
        dbus-x11 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN --mount=type=cache,target=/root/.npm \
    npm install -g typescript

# Set up working directory and change ownership
WORKDIR /meshsdk

# Copy files
COPY .git .git
COPY cmake cmake
COPY thirdparty thirdparty
COPY scripts scripts
COPY source source
COPY requirements requirements
COPY wasm wasm
# Fix the issue with line endings when developing on a Windows but running on a UNIX docker container
# Change the EOL for all files from `CRLF` to `LF`
# RUN find . -type f -exec sed -i 's/\r$//' {} \;
RUN find scripts/ -name "*.sh" -type f -exec sed -i 's/\r$//' {} \; && \
    chmod +x scripts/*.sh

# Set environment variables for thirdparty build
# These variables control the build configuration for dependencies
ENV MR_STATE=DOCKER_BUILD
ENV MR_EMSCRIPTEN=ON
# Build thirdparty dependencies for default wasm configuration (multithreaded, 32-bit)
# This is the most commonly used configuration, so we build it first
RUN echo "Building thirdparty dependencies (default: multithreaded, 32-bit)..." && \
    ./scripts/build_thirdparty.sh && \
    ./scripts/cmake_install.sh /usr/local/lib/emscripten && \
    echo "Cleaning up build artifacts to reduce layer size..." && \
    rm -rf bin include lib share thirdparty_build

# Build thirdparty dependencies for single-threaded configuration
# This creates a separate installation to avoid conflicts
ENV MR_EMSCRIPTEN_SINGLE=ON
RUN echo "Building thirdparty dependencies (singlethreaded, 32-bit)..." && \
    ./scripts/build_thirdparty.sh && \
    ./scripts/cmake_install.sh /usr/local/lib/emscripten-single && \
    echo "Cleaning up build artifacts..." && \
    rm -rf bin include lib share thirdparty_build

# Build thirdparty dependencies for 64-bit WASM configuration
# Reset single-threaded flag and enable 64-bit WASM
ENV MR_EMSCRIPTEN_SINGLE=OFF
ENV MR_EMSCRIPTEN_WASM64=ON
RUN echo "Building thirdparty dependencies (multithreaded, 64-bit)..." && \
    ./scripts/build_thirdparty.sh && \
    ./scripts/cmake_install.sh /usr/local/lib/emscripten-wasm64 && \
    echo "Cleaning up build artifacts..." && \
    rm -rf bin include lib share thirdparty_build

# Reset environment variables to default state
ENV MR_EMSCRIPTEN_WASM64=OFF

# Install AWS CLI for potential deployment needs
# This is done after thirdparty builds to avoid affecting the build environment
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update && \
    rm -rf awscliv2.zip aws/

# TODO: Switch to non-root user for security
RUN useradd -ms /bin/bash zzz && \
    sudo chmod -R 777 /emsdk/upstream/emscripten/
RUN chown -R zzz:zzz /meshsdk/ && \
    sudo chmod -R 777 /meshsdk/
# USER zzz

# Set default environment variables for source build
ENV MESHSDK_BUILD_RELEASE=ON
ENV MESHSDK_BUILD_DEBUG=OFF
ENV MR_CXX_STANDARD=23
ENV MR_PCH_USE_EXTRA_HEADERS=ON

# Default command - this will be overridden by docker-compose
CMD ["/bin/bash"]
