#!/usr/bin/env bash

# Run this script prior to running `yarn install` on the host,
# in order to setup and configure yarn correctly before using it.
# Note this is an alternative to checking in the yarn release itself.

# NOTE: This script also runs as the entrypoint of every JS container

# Simply run:
# ./setup.sh

SPLITGRAPH_DIR=${1-"$(cd -P -- "$(dirname -- "$0")" && pwd -P)"}

# If `yarn --version` is not exact match of `$TARGET_YARN_VERSION`, install yarn
TARGET_YARN_VERSION="${TARGET_YARN_VERSION-"2.4.1"}"

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
        # yarn 1 will not allow us to do anything but `yarn set version berry`
        # so we need to install berry first, then we can install our pinned version
        echo "Install yarn berry so we can install our target version"
        set -e
        pushd "$SPLITGRAPH_DIR"
        yarn set version berry

        berry_saved_to="$(yarn config get yarnPath)"

        echo "-- .yarnrc.yml"
        cat .yarnrc.yml
        echo "--"

        echo "Now install the target version ($TARGET_YARN_VERSION)"

        set -e
        saved_to="$(yarn set version "${TARGET_YARN_VERSION}" \
            | grep -i 'saving' \
            | grep "$TARGET_YARN_VERSION" \
            | awk '{ print $NF }')"

        set +e

        echo "Saved to: $saved_to"

        if test -f "$saved_to" && test "$(dirname "$saved_to")" != "$(dirname ".yarn/releases/.")" ; then
            echo "Need to move newly installed file into .yarn dir"
            mv "$saved_to" .yarn/releases/
        fi

        set_version_to=".yarn/releases/$(ls -t .yarn/releases/ | head -n1)"

        echo "Delete .yarnrc.yml with wrong version and overwrite it"
        echo "yarnPath: $set_version_to" > .yarnrc.yml
        # rm .yarnrc.yml

        # echo "Set version to: $set_version_to"
        # yarn config set yarnPath "$set_version_to"

        berry_saved_to_workspace="$(dirname $(dirname $(dirname "$berry_saved_to")))"
        parent_dir_yarnrc="$berry_saved_to_workspace/.yarnrc.yml"

        echo "berry_saved_to_workspace=$berry_saved_to_workspace"

        if [[ $PWD/ = /$berry_saved_to_workspace/* ]] ; then
            # todo: might want to save it beforehand and have a way to recover
            echo "Berry was installed to parent, so delete that .yarnrc too"

            # we're assuming it's in a dir called .yarn/releases
            berry_saved_to_workspace="$(dirname $(dirname $(dirname "$berry_saved_to")))"

            parent_dir_yarnrc="$berry_saved_to_workspace/.yarnrc.yml"

            if test -f "$parent_dir_yarnrc" ; then
                echo "delete: $parent_dir_yarnrc"
                rm "$parent_dir_yarnrc"
            fi
        fi

        if test -f "$berry_saved_to" ; then
            echo "Delete yarn berry: $berry_saved_to"
            rm "$berry_saved_to"
        fi

        popd

        # yarn set version "$saved_to"

        echo "Installed: $(yarn --version)"

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
            echo "found this one: "
            ls "$SPLITGRAPH_DIR"/.yarn/releases/yarn-2*

            mv "$SPLITGRAPH_DIR"/.yarn/releases/yarn-2* \
                "$SPLITGRAPH_DIR"/.yarn/releases/yarn-berry.js \
                && sed -Ei 's/yarn-[0-9+\.]+\.(cjs|js)/yarn-berry.js/' "$SPLITGRAPH_DIR"/.yarnrc.yml
        fi

        # Account for releases with naming scheme yarn-3*.(js|cjs)
        if ls "$SPLITGRAPH_DIR"/.yarn/releases/yarn-3* 2>/dev/null ; then
            mv "$SPLITGRAPH_DIR"/.yarn/releases/yarn-3* \
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

    pushd "$SPLITGRAPH_DIR"
    has_correct_config || setup_yarn
    popd

    if ! dir_has_yarn_plugins "$SPLITGRAPH_DIR" ; then
        echo "Install yarn plugins into $SPLITGRAPH_DIR"

        install_plugins "$SPLITGRAPH_DIR"
    fi
    set +e

    return 0
}

install_plugins() {
    local prefixDir="$1"
    shift

    WORKSPACE_TOOLS='https://raw.githubusercontent.com/yarnpkg/berry/%40yarnpkg/plugin-workspace-tools/2.2.0/packages/plugin-workspace-tools/bin/%40yarnpkg/plugin-workspace-tools.js'
    CONSTRAINTS='https://raw.githubusercontent.com/yarnpkg/berry/%40yarnpkg/plugin-constraints/2.2.0/packages/plugin-constraints/bin/%40yarnpkg/plugin-constraints.js'
    INTERACTIVE_TOOLS='https://raw.githubusercontent.com/yarnpkg/berry/%40yarnpkg/plugin-interactive-tools/2.2.0/packages/plugin-interactive-tools/bin/%40yarnpkg/plugin-interactive-tools.js'

    pushd "$prefixDir" && yarn plugin import https://raw.githubusercontent.com/milesforks/yarn-plugin-workspace-lockfile/main/packages/plugin/bundles/%40yarnpkg/plugin-workspace-lockfile.js \
        && popd
    pushd "$prefixDir" && yarn plugin import "$INTERACTIVE_TOOLS" && popd
    pushd "$prefixDir" && yarn plugin import "$CONSTRAINTS" && popd
    pushd "$prefixDir" && yarn plugin import "$WORKSPACE_TOOLS" && popd

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

    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-constraints.cjs ; then
            mv "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-constraints.cjs \
               "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-constraints.js
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

        grep 'plugin-constraints' "$yarnrcFile" \
            && sed -i 's/plugin-constraints\.cjs/plugin-constraints\.js/' "$yarnrcFile"


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

    echo "Dir has yarn release?"

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
    if test -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-constraints.cjs ; then
        rm -f "$prefixDir"/.yarn/plugins/@yarnpkg/plugin-constraints.cjs
    fi

    if has_broken_yarn "$prefixDir" ; then
        echo "yarn seems broken in $prefixDir, remove .yarnrc.yml"
        rm -f "$prefixDir"/.yarnrc.yml
        return 1
    fi

    if has_wrong_yarn_version "$prefixDir" ; then
        echo "yarn seems outdated in $prefixDir, return 1 to trick into upgrade"
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
            && grep 'plugin-constraints.js' "$prefixDir"/.yarnrc \
            && return 0
    elif test -f "$prefixDir"/.yarnrc.yml ; then
        grep 'plugin-workspace-tools.js' "$prefixDir"/.yarnrc.yml \
            && grep 'plugin-interactive-tools.js' "$prefixDir"/.yarnrc.yml \
            && grep 'plugin-workspace-lockfile.js' "$prefixDir"/.yarnrc.yml \
            && grep 'plugin-constraints.js' "$prefixDir"/.yarnrc.yml \
            && return 0
    fi

    return 1
}


# OPTIONAL:
#   If $TARGET_YARN_VERSION is set, then `yarn --version` must be exact match
has_wrong_yarn_version() {

    # specifying a target version is optional, so bail out if not specified
    if test -z "$TARGET_YARN_VERSION" ; then
        return 1
    fi

    local prefixDir="$1"
    shift

    pushd "$prefixDir"

    local yarn_version
    yarn_version="$(yarn --version)"

    # For now we just check exact match
    if test "$yarn_version" != "$TARGET_YARN_VERSION" ; then
        echo "yarn --version ($yarn_version) is not TARGET_YARN_VERSION ($TARGET_YARN_VERSION)"
        popd && return 0
    fi

    popd && return 1
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

if test -n "$DEBUG" && test "$DEBUG" == "1" ; then
    prep_env || { echo "Fatal error." ; exit 1 ; }
else
    prep_env >/dev/null || { \
        echo "Fatal error in setup.sh. (note: message may have been sent to /dev/null)"; \
        exit 1 ;\
    }
fi

exit 0
