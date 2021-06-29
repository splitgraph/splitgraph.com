#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

if test ! -z "$YARN_CACHE_FOLDER" ; then

    if git log --format=%B HEAD -n1 | grep -q '[clear cache]' ; then
        >&2 echo "Clear cache ${YARN_CACHE_FOLDER}..."
        test -d "$YARN_CACHE_FOLDER" && rm -r "$YARN_CACHE_FOLDER"
    fi

    mkdir -p "$YARN_CACHE_FOLDER"
    echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)"
fi

# We need to set the special lockfile name here, because if we use yarn.lock,
# then when running in the parent monorepo, yarn will think its in its own root
pushd "$SPLITGRAPH_DIR" \
    && WORKSPACE_LOCKFILE=yarn-public-workspace.lock ./setup.sh \
    && yarn install \
    && echo "Installed successfully" \
    && (
        test ! -z "$YARN_CACHE_FOLDER" \
            && echo "Yarn cache ($YARN_CACHE_FOLDER): $(ls -l "$YARN_CACHE_FOLDER" | wc -l)" \
            || true
    ) && exit 0

exit 1
