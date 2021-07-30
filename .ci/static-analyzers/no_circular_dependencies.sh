#!/usr/bin/env bash

ANALYZERS_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
CI_DIR="$ANALYZERS_DIR/.."
SPLITGRAPH_DIR="$CI_DIR/.."

if test -z "$TSCONFIG_FILE" ; then
    echo "TSCONFIG_FILE not set"
    exit 1
fi

pushd "$SPLITGRAPH_DIR" >/dev/null

# Be sure to exec, because madge will exit non-zero on circular dependencies
# and yarn dlx will pass through the exit code as well
exec yarn dlx madge \
    --exclude '^.*?(\.yarn|\.next|dist|_content|node_modules).*?$' \
    --extensions js,ts,tsx \
    --circular \
    --no-spinner \
    --ts-config "$TSCONFIG_FILE" .
