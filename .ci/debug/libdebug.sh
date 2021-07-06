#!/usr/bin/env bash

infinite_sleep() {
    echo "Sleeping in foreground..."
    echo "Attach to container with:"
    echo
    echo "-"
    echo '  docker exec -it $(docker ps -q --filter name=act-*) /bin/bash'
    echo
    echo "-"
    echo
    echo "Or, to kill this container:"
    echo "-"
    echo '  docker kill $(docker ps -q --filter name=act-*)'
    echo "-"

    echo "(Sleeping now... ctrl+c might not be enough to kill me)"

    while :
    do
        sleep 10 &
        wait $!
    done

    exit 2
}
