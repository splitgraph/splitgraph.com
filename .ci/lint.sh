#!/usr/bin/env bash

# See lints/README.md for documentation on adding a linter

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

pushd "$CI_DIR" >/dev/null 2>/dev/null

ERRORS=no

while read -r linter_script ; do

    echo
    echo -n "Linting: $linter_script ... "

    lint_result=$(mktemp)

    $linter_script >"$lint_result" 2>"$lint_result"  \
        && { echo "ok" | ./util/bold.sh ; } \
        || { echo "fail! Errors:" | ./util/bold.sh --red ; echo "" ; \
             sed 's/^/  /' < "$lint_result" ; \
             ERRORS=yes ; \
            }
done < <(find ./linters -type f -executable)

if test "$ERRORS" == "yes" ; then
    exit 1
else
    exit 0
fi
