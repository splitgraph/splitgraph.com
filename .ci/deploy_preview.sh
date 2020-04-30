#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

COMMITISH="$(git rev-parse HEAD | cut -c -8)"
COMMIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

pushd "$SPLITGRAPH_DIR" \
    && yarn deploy \
        --force \
        -m COMMITISH="$COMMITISH" \
        -m COMMIT_BRANCH="$COMMIT_BRANCH" \
    && echo "Deployment successful" \
    && echo "Deployment URL: $("$CI_DIR"/get_preview_url.sh)" \
    && exit 0

exit 1
