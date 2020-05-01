#!/usr/bin/env bash

# Run this script if you are running into issues caused by overlap with docker runs,
# e.g.:
#
#   - permission troubles (bind mounts now owned by root)
#   - "missing manifest" errors
#
# You may need to run this script as root, e.g.:
#
# sudo ./clean.sh

WHOAMI=${SUDO_USER:-${USER}}

echo "Cleaning cache, node_modules, and any created packages (dist)..."
echo "Clean cache..." \
    && rm -r .yarn/cache \
    && mkdir -p .yarn/cache \
    && echo "Clean node_modules directories..." \
    && find . -maxdepth 2 -name node_modules -print -exec rm -r {} \; \
    && echo "Run sub clean.sh scripts..." \
    && find . -mindepth 2 -maxdepth 2 -type f -name clean.sh -print -exec {} \; \
    && echo "Set ownership to $WHOAMI for any files owned by root..." \
    && find . -group root -exec chown -R "$WHOAMI":"$WHOAMI" {} \; \
    && echo "Done cleaning. You might want to run ./setup.sh" \
    && exit 0

exit 1
