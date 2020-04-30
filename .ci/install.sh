#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

if test ! -z "$YARN_CACHE_FOLDER" ; then
    mkdir -p "$YARN_CACHE_FOLDER"
    echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)"
fi

pushd "$SPLITGRAPH_DIR" \
    && ./setup.sh \
    && yarn install --immutable \
    && echo "Installed successfully" \
    && (
        test ! -z "$YARN_CACHE_FOLDER" \
            && echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)" \
            || true
    ) && exit 0

exit 1
