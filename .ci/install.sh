#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

if test -n "$ACT" ; then
    . "$CI_DIR"/debug/libdebug.sh
fi

# yarn cache is per branch by default. Clear it with commit pragma [clear cache]
if test ! -z "$YARN_CACHE_FOLDER" ; then
    if git log --format=%B HEAD -n1 | grep -q '[clear cache]' ; then
        >&2 echo "Clear cache ${YARN_CACHE_FOLDER}..."
        test -d "$YARN_CACHE_FOLDER" && rm -r "$YARN_CACHE_FOLDER"
    fi

    mkdir -p "$YARN_CACHE_FOLDER"
    echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)"
fi

# For debugging: Sleep in foreground so user can attach to container
# (I couldn't find how to force act to run the container in interactive mode)
if test -n "$BREAK_INTERACTIVE_BEFORE_INSTALL" ; then
    echo "BREAK_INTERACTIVE_ON_INSTALL is set (not empty)"
    infinite_sleep
fi

# We need to set the special lockfile name here, because if we use yarn.lock,
# then when running in the parent monorepo, yarn will think its in its own root
export WORKSPACE_LOCKFILE=yarn-public-workspace.lock
pushd "$SPLITGRAPH_DIR" \
    && ./setup.sh \
    && yarn install --immutable \
    && echo "Installed successfully" \
    && (
        test ! -z "$YARN_CACHE_FOLDER" \
            && echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)" \
            || true
    ) && exit 0

exit 1
