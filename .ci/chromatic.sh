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

# Move to the docs directory where storybook is
cd docs || { echo "Failed to cd to docs" ; exit 1 ; }

# Write the build to a known location (not default /tmp) so that CI can cache it
mkdir -p out-storybook

# https://www.chromatic.com/docs/cli
# note: --ignore-last-build-on-branch is for rebase situations (see above link)
# todo: add --skip argument, if commit msg includes e.g. [skip chromatic]
yarn dlx chromatic \
    --build-script-name "storybook-build" \
    --output-dir "out-storybook" \
    --project-token="$CHROMATIC_PROJECT_TOKEN" \
    --ignore-last-build-on-branch \
    --auto-accept-changes \
    && exit 0

exit 1
