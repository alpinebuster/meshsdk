import setuptools
import pathlib
import argparse
import os
import platform
import sys


platform_system = platform.system()
print(platform_system)

VERSION = ""

if '--version' in sys.argv:
    index = sys.argv.index('--version')
    sys.argv.pop(index)  # Removes the '--foo'
    VERSION = sys.argv.pop(index)  # Returns the element after the '--foo'

PY_VERSION=str(sys.version_info[0]) + "." + str(sys.version_info[1])
LIBS_EXTENSION = ""

if platform_system == "Windows":
    LIBS_EXTENSION = "pyd"
elif platform_system == "Linux":
    LIBS_EXTENSION = "so"
elif platform_system == "Darwin":
    LIBS_EXTENSION = "so"

MODULES = [
    "mrmeshpy",
    "mrmeshnumpy",
    "mrviewerpy",
    "mrcudapy",
]

here = pathlib.Path(__file__).parent.resolve()
# Get the long description from the README file
long_description = (here / "README.md").read_text(encoding="utf-8")

setuptools.setup(
    name="meshsdk",
    version=VERSION,
    author="alpinebuster",
    author_email="imzqqq@hotmail.com",
    description="3D processing library",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/alpinebuster/meshsdk",
    license_files=('LICENSE',),
    packages=['meshsdk'],
    package_data={
        'meshsdk':
            [f"{module}.{LIBS_EXTENSION}" for module in MODULES] +
            [f"{module}.pyi" for module in MODULES]
    },
    include_package_data=True,
    classifiers=[
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.12',
        'Programming Language :: Python :: 3.13',
        'Programming Language :: Python :: 3.14',
        "License :: Free for non-commercial use",
        "License :: Free For Educational Use",
        "Operating System :: Microsoft :: Windows",
        "Operating System :: POSIX :: Linux",
        "Operating System :: MacOS :: MacOS X",
    ],
    python_requires='>=3.8',
    install_requires=[
        'numpy>=1.19.0',
    ],
    project_urls={  # Optional
        "Bug Reports": "https://github.com/alpinebuster/meshsdk/issues",
        "Source": "https://github.com/alpinebuster/meshsdk",
    },
)
