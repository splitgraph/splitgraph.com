#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" \
    && yarn build \
    && cp proxyDirectories.txt out/proxyDirectories.txt \
    && echo "Build successful" \
    && exit 0

exit 1
