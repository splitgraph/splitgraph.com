#!/usr/bin/env bash

# Run all the executables in a given directory set by argv[1] or $EXECUTABLE_DIR
# For any with non-zero exit code, print stdout/stderr to stdout

# This script is meant to be called by another script.
# If you're using it interactively, make sure you call it from this repo root

UTIL_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"
CI_DIR="$UTIL_DIR/.."

EXECUTABLE_DIR="${1-EXECUTABLE_DIR}"

ERRORS=no

TMP_PREFIX="run-executables-$RANDOM"
TMP_FORMAT="${TMP_PREFIX}-XXXXX"

main() {
    pushd "$CI_DIR" >/dev/null 2>/dev/null

    echo "Running executables in $EXECUTABLE_DIR (${CI_DIR}/${EXECUTABLE_DIR}) ..."
    echo

    run_matching_scripts
    dump_logs_if_debugging
    exit_with_status_code
}

run_matching_scripts() {
    while read -r exec_script ; do
        echo -n "$exec_script ... "

        execlog=$(mktemp -t "$TMP_FORMAT")

        if $exec_script >"$execlog" 2>"$execlog" ; then
            report_success
        else
            report_failure "$execlog"
            ERRORS=yes
        fi

        echo
    done < <(find "$EXECUTABLE_DIR" -type f -executable)
}

report_success() {
    echo "ok" | "$CI_DIR"/util/bold.sh && return 0
    return 1
}

report_failure() {
    local execlog="$1"

    echo "failed! Errors:" | "$CI_DIR"/util/bold.sh --red
    echo ""

    # only print lines following the first line containing 'YN0000: Done in'
    # in order to avoid printing yarn dlx spam, without suppressing yarn dlx failures
    YARN_DONE_MARKER="YN0000: Done in"
    if grep -q -m1 "$YARN_DONE_MARKER" "$execlog" ; then
        sed -n 's/^/    /;/YN0000: Done in/,$p' < "$execlog"
    else
        # Otherwise just indent it (omit -n so that we print all lines)
        sed 's/^/    /' < "$execlog"
    fi
}

dump_logs_if_debugging() {
    # If you are getting "silent" errors, set DEBUG=1 to print
    if test "$DEBUG" == "1" ; then
        echo
        echo "---- DEBUGGING OUTPUT (DEBUG is set to 1):"
        echo
        cat "/tmp/${TMP_PREFIX-GuardNoExpandRootDir}"*
    fi
}

exit_with_status_code() {
    if test "$ERRORS" == "yes" ; then
        exit 1
    else
        exit 0
    fi
}

main "@"
