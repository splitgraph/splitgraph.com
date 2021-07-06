#!/usr/bin/env bash

DEBUG_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
REPO_DIR="$DEBUG_DIR/../.."
DEBUG_REL_DIR=".ci/debug/"

ACT_TARGET_ACTION="${1-build_and_deploy_preview}"
if test -n "$ACT_TARGET_ACTION" ; then
    shift
fi

ACT_EVENT_PAYLOAD="${1-"${DEBUG_REL_DIR}"payloads/commit-event.json}"
if test -n "$ACT_EVENT_PAYLOAD" ; then
    shift
fi

# note: remaining arguments will be passed to `act` in final `exec`

# need to use "no" so that act doesn't ask the user to set it
# BREAK_INTERACTIVE_BEFORE_INSTALL=${"$BREAK_INTERACTIVE_BEFORE_INSTALL"-"no"}

pushd "$REPO_DIR"
trap "popd" exit

echo "All config variables are OPTIONAL. Simply press enter to skip one."
echo "Current variables set:"
echo
echo -n "  BREAK_INTERACTIVE_BEFORE_INSTALL=\"${BREAK_INTERACTIVE_BEFORE_INSTALL}\""
echo "        # If non-empty, infinite sleep before yarn install"
echo
echo "---"
echo

# act docs: https://github.com/nektos/act
exec act \
    -j "${ACT_TARGET_ACTION}" \
    -e "$ACT_EVENT_PAYLOAD" \
    -s BREAK_INTERACTIVE_BEFORE_INSTALL="$BREAK_INTERACTIVE_BEFORE_INSTALL" \
    "$@"
