#!/usr/bin/env bash

CI_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
SPLITGRAPH_DIR="$CI_DIR/.."

# Set to true with any non-blank value (1, yes, etc.) to only build storybook
BUILD_STORYBOOK_ONLY_WITHOUT_CHROMATIC="${BUILD_STORYBOOK_ONLY_WITHOUT_CHROMATIC-""}"

pushd "$SPLITGRAPH_DIR"

if test -f tsconfig.ci.json ; then
    >&2 echo "Build error: tsconfig.ci.json still exists, which means typecheck did not happen"
    popd
    exit 1
fi

if test ! -d dist ; then
    >&2 echo "Build error: missing dist folder. Did typecheck pass?"
    popd
    exit 1
fi

if test ! -d docs ; then
    >&2 echo "Build error: missing docs package."
    popd
    exit 1
fi

# Move to the docs directory where storybook is
cd docs || { echo "Failed to cd to docs" ; exit 1 ; }

# Write the build to a known location (not default /tmp) so that CI can cache it
mkdir -p out-storybook

main() {
    if test -n "$BUILD_STORYBOOK_ONLY_WITHOUT_CHROMATIC" ; then
        build_storybook_only && return 0
    else
        build_and_ship_to_chromatic && return 0
    fi

    return 1
}

build_and_ship_to_chromatic() {
    if test -z "$CHROMATIC_PROJECT_TOKEN" ; then
        >&2 echo "Configuration error: Missing required secret CHROMATIC_PROJECT_TOKEN"
        popd
        exit 1
    fi

    # https://www.chromatic.com/docs/cli
    # note: --ignore-last-build-on-branch is for rebase situations (see above link)
    # todo: add --skip argument, if commit msg includes e.g. [skip chromatic]
    yarn dlx chromatic \
        --build-script-name "storybook-build" \
        --output-dir "out-storybook" \
        --project-token="$CHROMATIC_PROJECT_TOKEN" \
        --ignore-last-build-on-branch \
        --auto-accept-changes \
        && return 0

    return 1
}

build_storybook_only() {
    yarn run storybook-build \
        --output-dir out-storybook \
        && return 0
    return 1
}

main "$@" && exit 0

exit 1

# the end. remainder of file is for debugging and notes
# NOTE
# TEMPORARY WORKAROUND for upstream bugs amidst the ecosystem migration to webpack 5
# [Commenting here since this is the file that could have a CI failure due to this.]
#
# The relevant code is actually in `splitgraph.com/package.json`, but I can't
# leave comments in JS files, and this deserves an explanation...
#
#   "@storybook/react/webpack": "5.51.1"
#
# We are telling @storybook/react to resolve webpack to 5.51.1, which means it
# will _provide_ webpack@5.51.1 as a peerDependency to the buggy package
# below it, `react-docgen-typescript-plugin`, which we want to force to
# accept webpack 5 instead of webpack 4 while both are within its range of >= 4.
#
# -- PROBLEM:
# Problem is `react-docgen-typescript-plugin` peerDependency webpack @ >= 4
# We're using webpack 5 for storybook compilation, but it's experimental, and
# Storybook still uses webpack 4 for its "manager interface." So we need to
# keep a copy of both webpack 4 and webpack 5.
#
# webpack 5 is _not_ hoisted (it's in docs)
# webpack 4 _is_ hoisted (it goes to root)
#
# There is a bug (IMO) in `react-docgen-typescript-plugin`, where it tries to
# import directly from the resolved location of webpack 4, even though it's
# attempting to import files that only exist in webpack 5. The maintainer is
# not going to drop webpack 4 until the next major release.
#
# n.b: This problem will only reproduce when `splitgraph/splitgraph.com` repo
# is running in "isolation", i.e. during CI or by a developer outside the monorepo.
#
# To reproduce locally, you can use ACT or just clone the repo to a temp dir.
# For details on using ACT, see README.md
#
# -- FIX:
# yarn resolutions to the rescue! We want to force `react-docgen-typescript-plugin`
# to resolve webpack 4 to webpack 5, but _without_ overriding resolutions of other
# packages that depend on webpack 4 (like this alleged manager code).
#
# But since it's a peer dependency, the package has no say in what version satisfies
# its range of >= 4. So setting a resolution for that package wouldn't do anything.
#
# Instead, we want to tell the _parent_ of the buggy package to _provide_ it with
# webpack 5 as a peerDependency to satisfy the range of `webpack >= 4`.
#
# In this case, the parent is `@storybook/react`, and it's _providing_ `webpack`
# so we need to use `@storybook/react/webpack` as the key in the `resolutions` field.

# Note: This will likely also change the version of webpack provided to any other
# direct dependencies of `@storybook/react` that have a webpack peer dependency
# of any version. This hasn't caused problems yet.
#
#[More targeted approach would be to `yarn patch` that buggy
# repository and change its peerDependencies to 5.  ]
#
# DEBUGGING / INVESTIGATING IF HACK IS STILL NECESSARY
#
# Eventually this bug will be fixed and this hack will be unnecessary.
# Here are some helpful commands for investigating (but first, reproduce the error)
#
#       # find the relevant peer-requirement. Need 5 digit pHash, e.g. p387a7
#       yarn explain peer-requirements | grep webpack | grep docgen
#
#       # explain that specific ID
#       yarn explain peer-requirements p387a7
#
#       # set the resolution for webpack to pin at 5.51.1
#       # (we will want 5.51.1 to match whatever version of webpack is installed)
#       yarn set resolution @storybook/react-docgen-typescript-plugin@*/webpack 5.51.1
#
