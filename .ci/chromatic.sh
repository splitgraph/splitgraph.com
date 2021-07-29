#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR"

if test -f tsconfig.ci.json ; then
    >&2 echo "Build error: tsconfig.ci.json still exists, which means typecheck did not happen"
    popd
    exit 1
fi

if test ! -d dist ; then
    >&2 echo "Build error: missing dist folder. Did typecheck pass?"
    popd
    exit 1
fi

yarn dlx chromatic --project-token="$CHROMATIC_PROJECT_TOKEN"

exit 1
