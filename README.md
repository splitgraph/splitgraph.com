# splitgraph.com website

## reset, install, and run dev -- one liner:

```bash
{ sudo ./clean.sh ; } ; ./setup.sh && yarn install && yarn dev
```

## scripts for running on host machine:

- `./clean.sh`:

  - Run this script to "reset" everything, especially if you've been running
    in docker and are having issues with overlapping permissions, or missing
    manifest files
  - Note: If you are fixing permission errors, you likely want to run this with `sudo`

- `./setup.sh`:

  - Run this script to setup `yarn` itself, especially if you are having trouble
    with running `yarn` (error, "missing yarn berry" or anything like this)

- `yarn dev`
  - Run this script to start dev of the docs, after running `yarn install`

## debugging CI

```bash

# Start `act`
.ci/debug/run_act.sh

# "Break" before running bulk of install step (see `install.sh`)
.ci/debug/run_act_break_before_install.sh

# The "break" is just an infinite loop of `sleep 10`
# To get an interactive shell, need to `docker exec` into that container

docker exec -it $(docker ps -q --filter name=act-*) /bin/bash

# If you need to kill the container
docker kill $(docker ps -q --filter name=act-*)
```
