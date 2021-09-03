#!/usr/bin/env bash

# Bold stdin and print it to stdout

BOLDBLUE='\033[1;34m'
NONE='\033[00m'
BOLDRED='\033[1;31m'

while IFS= read -r line; do

    if test "$1" == "--red" ; then
        echo -en "${BOLDRED}"
    else
        echo -en "${BOLDBLUE}"
    fi

    echo -n $line
    echo -en "${NONE}"
    echo
done
