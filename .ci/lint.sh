#!/usr/bin/env bash

# See lints/README.md for documentation on adding a linter

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

pushd "$CI_DIR" >/dev/null 2>/dev/null

exec util/run_executables.sh linters
