#!/usr/bin/env bash

# Get the preview URL for the latest deployment with this commitish as metadata
# Print the preview URL to stdout for capture, and also to stderr for debugging
#
# Usage example to capture to stdout:
#   preview_url="$(./.ci/get_preview_url.sh)"
#
# or, to save to file `preview_url.txt`:
#   ./.ci/get_preview_url.sh preview_url.txt
#
# or, to save to file `preview_url.txt` using commitish `f8f3f20e`
#   ./ci/get_preview_url.sh preview_url.txt f8f3f20e
#
# or, to save to no file (/dev/null) using commitish `f8f3f20e`
#   ./ci/get_preview_url.sh /dev/null f8f3f20e
#

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

OUTPUT_FILE="${1-/dev/null}"
COMMITISH=${2-"$(git rev-parse HEAD | cut -c -8)"}

cd "$SPLITGRAPH_DIR" \
    && >&2 echo -n "Getting preview URL for $COMMITISH (write to $OUTPUT_FILE)... " \
    && ( yarn run deploy ls splitgraph-web \
        -m COMMITISH="$COMMITISH" \
        2> /dev/null \
        | grep splitgraph-web \
        | awk '{print $2}' \
        | head -n1 \
        | tr -d '\n' \
        | awk '{print;print > "/dev/stderr"}' \
        | tee "$OUTPUT_FILE" ) \
    && exit 0

>&2 echo "Fatal Error: Could not get preview URL"
exit 1
