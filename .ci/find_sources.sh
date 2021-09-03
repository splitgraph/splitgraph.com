#!/usr/bin/env bash

# Utility function
# find the "source" files for this repository. Extra args passed to find util
# Note this is opinionated in what it considers a source file

# Usage: ./find_sources.sh [...find args]
# Examples:
#
#   ./.ci/find_sources.sh -print1
#   ./.ci/find_sources.sh -exec grep -n 'from "' {} /dev/null \;


CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

pushd "$SPLITGRAPH_DIR" >/dev/null

exec find . -type f \
       ! -path '*dist*' \
    -a ! -path '*node_modules*' \
    -a ! -path '*_content*' \
    -a ! -path '*.next*' \
    -a ! -path '*docs/public*' \
    -a ! -path '*.yarn*' \
    -a \( \
        -iname '*.ts' \
        -o -iname '*.tsx' \
        -o -iname '*.js' \
        -o -iname '*.jsx' \
    \) "$@"
