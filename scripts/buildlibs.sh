#!/usr/bin/env bash

SPLITGRAPH_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

pushd "$SPLITGRAPH_DIR" \
    && echo "Clean @splitgraph/tlib..." \
    && yarn workspace @splitgraph/tlib clean \
    && echo "Build @splitgraph/tlib..." \
    && yarn workspace @splitgraph/tlib build \
    && echo "Clean @splitgraph/tdesign..." \
    && yarn workspace @splitgraph/tdesign clean \
    && echo "Build @splitgraph/tdesign..." \
    && yarn workspace @splitgraph/tdesign build \
    && popd \
    && exit 0

exit 1
