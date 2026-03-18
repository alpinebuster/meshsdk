#!/bin/bash

set -e
cd "$(dirname "$0")"

DIRECTORY="lib"
if [ -d "${DIRECTORY}" ]; then
    rm -rf "${DIRECTORY:?}"/*
else
	mkdir -p lib/
fi

npx tsc --project tsconfig.production.json

cp src/MRJavaScript.wasm lib/
# cp src/MRJavaScript.data lib/
cp src/MRJavaScript.d.ts lib/
cp src/MRJavaScript.js lib/

function bundle () {
	ENVIRONMENT="$1"
	mkdir -p "${DIRECTORY}/${ENVIRONMENT}/"

    # The MRJavaScript.js file with the bootstrapping code for each specific
    # environment must already exist so we don't need to account for that here.
    # The rest of these files are exactly the same for all environments, so
    # simply copy them into the directory for this environment.
	cp lib/index.js lib/${ENVIRONMENT}/
	cp lib/index.d.ts lib/${ENVIRONMENT}/
	cp lib/MRJavaScript.js lib/${ENVIRONMENT}/
	cp lib/MRJavaScript.wasm lib/${ENVIRONMENT}/
	# cp lib/MRJavaScript.data lib/${ENVIRONMENT}/
	cp lib/MRJavaScript.d.ts lib/${ENVIRONMENT}/
}

# bundle node
# bundle web
