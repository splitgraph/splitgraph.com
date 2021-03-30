#!/usr/bin/env bash

# Run this script prior to running `yarn install` on the host,
# in order to setup and configure yarn correctly before using it.
# Note this is an alternative to checking in the yarn release itself.

# NOTE: This script also runs as the entrypoint of every JS container

# Simply run:
# ./setup.sh

SPLITGRAPH_DIR=${1-"$(cd -P -- "$(dirname -- "$0")" && pwd -P)"}

prep_env() {
    echo "Ensure certs..." \
        && echo "Ensure yarn..." \
        && ensure_yarn \
        && return 0
    return 1
}

ensure_yarn() {
    set -e
    if ! dir_has_yarn_release "$SPLITGRAPH_DIR" ; then
        echo "Install yarn berry"
        pushd "$SPLITGRAPH_DIR" && yarn set version berry && popd

        # Yarn berry changes the name of the yarn executable in some releases,
        # but we want to make sure it's called yarn-berry.js for consistency,
        # and for referencing it in dockerfiles, etc.
        # So, account for their various historical name changes.

        # when a new dev joins with a fresh install of yarn, they may have
        # changed the naming again, so look here for a fix.

        # Account for releases with naming scheme yarn-rc.js
        if test -f "$SPLITGRAPH_DIR"/.yarn/releases/yarn-rc.js ; then
            mv "$SPLITGRAPH_DIR"/.yarn/releases/yarn-rc.js \
                "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.js \
            && sed -i 's/yarn-rc/yarn-berry/' "$SPLITGRAPH_DIR"/.yarnrc.yml
        fi

        # Account for releases with naming scheme yarn-2*.(js|cjs)
        if ls "$SPLITGRAPH_DIR"/.yarn/releases/yarn-2* 2>/dev/null ; then
            mv "$SPLITGRAPH_DIR"/.yarn/releases/yarn-2* \
                "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.js \
                && sed -Ei 's/yarn-[0-9+\.]+\.(cjs|js)/yarn-berry.js/' "$SPLITGRAPH_DIR"/.yarnrc.yml
        fi

	# Account for releases with naming scheme yarn-berry.cjs
	if test -f "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.cjs ; then
	    mv "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.cjs \
	       "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.js \
	    && sed -i 's/yarn-berry\.cjs/yarn-berry\.js/' "$SPLITGRAPH_DIR"/.yarnrc.yml
	fi
    fi

    if ! dir_has_yarn_plugins "$SPLITGRAPH_DIR" ; then
        echo "Install yarn plugins"

        install_plugins "$SPLITGRAPH_DIR"
    fi
    set +e

    pushd "$SPLITGRAPH_DIR"
    has_correct_config || setup_yarn
    popd

    return 0
}

install_plugins() {
    local prefixDir="$1"
    shift

    pushd "$prefixDir" && yarn plugin import plugin-workspace-tools && popd
    pushd "$prefixDir" && yarn plugin import plugin-interactive-tools && popd
    pushd "$prefixDir" && yarn plugin import https://raw.githubusercontent.com/milesforks/yarn-plugin-workspace-lockfile/main/packages/plugin/bundles/%40yarnpkg/plugin-workspace-lockfile.js \
        && popd

    # Yarn sometimes releases workspace tools with .js and .cjs (tbh, maybe all .cjs now)
    # AFAICT it costs nothing to rename this to .js to standardize our checked in versions
    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs ; then
            mv "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs \
               "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-tools.js
    fi

    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs ; then
            mv "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs \
               "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-interactive-tools.js
    fi

    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-lockfile.cjs ; then
            mv "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-lockfile.cjs \
               "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-lockfile.js
    fi

    fix_yarnrc() {
        local yarnrcFile="$1"
        shift

        grep 'plugin-workspace-tools' "$yarnrcFile" \
            && sed -i 's/plugin-workspace-tools\.cjs/plugin-workspace-tools\.js/' "$yarnrcFile"

        grep 'plugin-interactive-tools' "$yarnrcFile" \
            && sed -i 's/plugin-interactive-tools\.cjs/plugin-interactive-tools\.js/' "$yarnrcFile"

        grep 'plugin-workspace-lockfile' "$yarnrcFile" \
            && sed -i 's/plugin-workspace-lockfile\.cjs/plugin-workspace-lockfile\.js/' "$yarnrcFile"


        return 0
    }

    # todo: Is it actually possible to have a .yarnrc named either of these things? Maybe was
    # earlier code covering a corner case that no longer exists? But is harmless to check both.
    if test -f "$prefixDir"/.yarnrc ; then
        fix_yarnrc "$prefixDir"/.yarnrc
    elif test -f "$prefixDir"/.yarnrc.yml ; then
        fix_yarnrc "$prefixDir"/.yarnrc.yml
    fi

    return 0
}


dir_has_yarn_release() {
    local prefixDir="$1"
    shift

    # Clean up old files that are deprecated and shouldn't be checked in anymore if they exist
    if test -f "$prefixDir"/.yarn/releases/yarn-rc.js ; then
        rm -f "$prefixDir"/.yarn/releases/yarn-rc.js
    fi
    if test -f "$prefixDir"/.yarn/releases/yarn-berry.cjs ; then
        rm -f "$prefixDir"/.yarn/releases/yarn-berry.cjs
    fi
    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs ; then
        rm -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    fi
    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs ; then
        rm -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-interactive-tools.cjs
    fi
    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-lockfile.cjs ; then
        rm -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-workspace-lockfile.cjs
    fi

    if has_broken_yarn "$prefixDir" ; then
        echo "yarn seems broken in $prefixDir, remove .yarnrc.yml"
        rm -f "$prefixDir"/.yarnrc.yml
        return 1
    fi

    test -f "$prefixDir"/.yarn/releases/yarn-berry.js \
        && return 0

    return 1
}


dir_has_yarn_plugins() {
    local prefixDir="$1"
    shift

    if test -f "$prefixDir"/.yarnrc ; then
        grep 'plugin-workspace-tools.js' "$prefixDir"/.yarnrc \
            && grep 'plugin-interactive-tools.js' "$prefixDir"/.yarnrc \
            && grep 'plugin-workspace-lockfile.js' "$prefixDir"/.yarnrc \
            && return 0
    elif test -f "$prefixDir"/.yarnrc.yml ; then
        grep 'plugin-workspace-tools.js' "$prefixDir"/.yarnrc.yml \
            && grep 'plugin-interactive-tools.js' "$prefixDir"/.yarnrc.yml \
            && grep 'plugin-workspace-lockfile.js' "$prefixDir"/.yarnrc.yml \
            && return 0
    fi

    return 1
}


# Sometimes a mismatch between .yarnrc.yml yarnPath and the actual yarn file
# can cause yarn to fail to start due to looking for the wrong file
has_broken_yarn() {
    local prefixDir="$1"
    shift

    pushd "$prefixDir"
    if ! yarn config >/dev/null 2>/dev/null ; then
    echo "Broken yarn"
        popd && return 0
    fi
    popd && return 1
}

setup_yarn() {
    if test ! -z "$WORKSPACE_LOCKFILE" ; then
        echo "set the lockfile to $WORKSPACE_LOCKFILE"
        # We need to remove any existing directive, because otherwise yarn config set
        # will not override the setting if yarnrc.yml says it's yarn.lock
        sed -i '/lockfileFilename:/d' "$(yarn config get rcFilename)"
        yarn config set lockfileFilename "$WORKSPACE_LOCKFILE"
    fi

    yarn config set nodeLinker node-modules \
        && return 0
    return 1
}

has_correct_config() {

    # If user has specified a custom lockfile name, make sure it's set correctly
    if test ! -z "$WORKSPACE_LOCKFILE" \
        && test "$(yarn config get lockfileFilename)" != "$WORKSPACE_LOCKFILE" ; then
        echo "lockfile is wrong, need to set it"
        return 1
    fi

    # (hacky, but efficient)
    # We want to be as fast as possible. So to avoid calling `yarn config` twice,
    # take a shortcut: run `yarn config` once, grep for one line we expect to
    # be there, and verify the line count is 1. Specifically, we expect that
    # `nodeLinker === node-modules`. Note we do not check for cache folder because
    # this is set by an environment variable (see export_envvars)

    yarn config \
        | grep -E 'node-modules' \
        | wc -l \
        | grep -qE 1$ \
    && return 0

    return 1
}

prep_env >/dev/null || { \
    echo "Fatal error in setup.sh. (note: message may have been sent to /dev/null)"; \
    exit 1 ;\
}

exit 0
