#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" \
    && mv tsconfig.ci.json tsconfig.json \
    && yarn build \
    && cp "$SPLITGRAPH_DIR"/docs/proxyDirectories.txt "$SPLITGRAPH_DIR"/docs/out/proxyDirectories.txt \
    && echo "Build successful" \
    && exit 0

exit 1
