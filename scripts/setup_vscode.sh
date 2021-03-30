#!/usr/bin/env bash

# If you're running in vscode, you want code completion, which means you
# need to install modules on the host. But if you're also running in docker,
# you may have permission errors that cause a simple `yarn install` to fail on the host

# When that happens, run this script to fix them
#
# ./scripts/setup_vscode.sh

SCRIPTS_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR=${1-"${SCRIPTS_DIR}/.."}

WHOAMI=${SUDO_USER:-${USER}}

if test ${EUID:-$(id -u)} -ne 0 ; then
    echo "Error: You should run this script as root:"
    echo '  sudo -E env "PATH=$PATH" ./scripts/setup_vscode.sh'
    exit 1
fi

if test -z "$(which yarn)" ; then
    echo "Error: Yarn not in path. Make sure you run sudo with path:"
    echo '    sudo -E env "PATH=$PATH" ./scripts/setup_vscode.sh'
    exit 1
fi


pushd "$SPLITGRAPH_DIR" \
    && echo "Correct permissions on node_modules folders..." \
    && find . -group root \
              -type d \
              -name node_modules \
              -print \
              -exec chown -R "$WHOAMI":"$WHOAMI" {} \; \
    && echo "Using yarn: $(which yarn)" \
    && yarn install --immutable \
    && exit 0

exit 1
