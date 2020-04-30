#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" \
    && ./setup.sh \
    && yarn install --immutable \
    && echo "Installed successfully" \
    && exit 0

exit 1
