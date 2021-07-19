#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" \
    && mv tsconfig.ci.json tsconfig.json \
    && yarn typecheck \
    && echo "Typecheck successful" \
    && exit 0

exit 1
