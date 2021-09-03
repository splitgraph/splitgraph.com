#!/usr/bin/env bash

# Run static analyzers on the code, after typechecking

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

pushd "$CI_DIR" >/dev/null 2>/dev/null

# Ironically, when we are in CI, we do NOT want to be using tsconfig.ci.json
# because in CI we _move_ that file to be in tsconfig.json
# But static analyzers like madge need to think they're in the root_dir
if test -f ../tsconfig.ci.json ; then
    echo "Warning: Using tsconfig.ci.json – If this is running in CI, this file"
    echo "should not exist, because it should have been moved to tsconfig.json"
    echo "If you are running this script from within the monorepo, this is okay."

    TSCONFIG_FILE=tsconfig.ci.json
elif test -f ../tsconfig.json ; then
    TSCONFIG_FILE=tsconfig.json
else
    echo "No tsconfig.json or tsconfig.ci.json file was found"
    exit 1
fi

TSCONFIG_FILE="$TSCONFIG_FILE" exec util/run_executables.sh static-analyzers
