#!/usr/bin/env bash

SPLITGRAPH_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

pushd "$SPLITGRAPH_DIR" \
    && echo "Build @splitgraph/tlib..." \
    && yarn workspace @splitgraph/tlib build \
    && echo "Build @splitgraph/tdesign..." \
    && yarn workspace @splitgraph/tdesign build \
    && echo "Build and export @splitgraph/docs..." \
    && yarn workspace @splitgraph/docs build \
    && popd \
    && exit 0

exit 1
