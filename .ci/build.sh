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

echo "Temporary quick build" && popd && exit 0

# yarn build \
#     && cp "$SPLITGRAPH_DIR"/docs/proxyDirectories.txt "$SPLITGRAPH_DIR"/docs/out/proxyDirectories.txt \
#     && echo "Build successful" \
#     && exit 0

exit 1
