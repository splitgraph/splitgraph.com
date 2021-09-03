#!/usr/bin/env bash

DEBUG_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

# Set flag to be checked by install.sh when it sources debug_install.sh
export BREAK_INTERACTIVE_BEFORE_INSTALL=yes
exec "$DEBUG_DIR"/run_act.sh "$@"
