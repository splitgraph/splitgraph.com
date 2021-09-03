#!/usr/bin/env bash

echo 'Do not import from the parent @cloud monorepo.'
echo

LINTERS_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
CI_DIR="$LINTERS_DIR/.."
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" >/dev/null

exec ./.ci/find_sources.sh -exec grep -n '@cloud' {} /dev/null \; \
    | grep --color=always '@cloud' \
    && exit 1

exit 0
