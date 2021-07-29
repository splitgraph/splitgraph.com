#!/usr/bin/env bash

echo 'When importing from an index script, do not add a trailing slash'
echo "This is a corner case every tool needs to implement and might treat differently,"
echo "so we prefer to be consistent."
echo
echo '   GOOD: import { x } from "@material-ui/core";'
echo '   BAD:  import { x } from "@material-ui/core/";'
echo

LINTERS_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
CI_DIR="$LINTERS_DIR/.."
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" >/dev/null

# Print any file with a line including `from "` and also `";`
exec ./.ci/find_sources.sh -exec grep -n 'from "' {} /dev/null \; \
    | grep --color=always '/";' \
    && exit 1

exit 0
