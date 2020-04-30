#!/usr/bin/env bash

# Get the preview URL for the latest deployment with this commitish as metadata
# Print the preview URL to stdout for capture, and also to stderr for debugging
# Usage example:
#   preview_url="$(./.ci/get_preview_url.sh)"

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

COMMITISH="$(git rev-parse HEAD | cut -c -8)"

cd "$SPLITGRAPH_DIR" \
    && >&2 echo -n "Getting preview URL... " \
    && ( yarn run deploy ls splitgraph-web \
        -m COMMITISH="$COMMITISH" \
        2> /dev/null \
        | grep splitgraph-web \
        | awk '{print $2}' \
        | head -n1 \
        | tr -d '\n' \
        | awk '{print;print > "/dev/stderr"}' ) \
    && exit 0

>&2 echo "Fatal Error: Could not get preview URL"
exit 1
