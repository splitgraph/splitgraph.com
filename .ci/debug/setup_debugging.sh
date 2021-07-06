#!/usr/bin/env bash

# The GitHub workflow should conditionally call this script when running in ACT

if ! test -n "$ACT" ; then
    echo "Fatal Error: Cannot call debug_preinstall.sh when not running inside ACT"
    exit 1
fi

# `yarn` should be installed in GitHub actions, but when we're debugging
# with `act`, the 500MB container doesn't include `yarn`, so install it
if ! which yarn ; then
    echo "------"
    echo "Yarn not found (running in act?) - install it..."
    echo "Node version: $(node --version)"
    echo "------"

    set -e
    apt-get update -qq
    apt-get install -yy curl gnupg2
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

    # Also, for some reason we nede to reinstall Node for this to work
    curl -sL https://deb.nodesource.com/setup_15.x | bash -
    apt-get install -yy nodejs
    apt-get install --no-install-recommends yarn
    set +e
fi

