#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR"

if test -z "$CHROMATIC_PROJECT_TOKEN" ; then
    >&2 echo "Configuration error: Missing required secret CHROMATIC_PROJECT_TOKEN"
    popd
    exit 1
fi

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

if test ! -d docs ; then
    >&2 echo "Build error: missing docs package."
    popd
    exit 1
fi

cd docs || { echo "Failed to cd to docs" ; exit 1 ; }

# Chromatic expects `yarn build-storybook` to exist (we are in docs directory)
yarn dlx chromatic \
    --project-token="$CHROMATIC_PROJECT_TOKEN" \
    --auto-accept-changes \
    && exit 0

exit 1
