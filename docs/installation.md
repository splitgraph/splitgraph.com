---
id: installation
title: Installation
---

A normal Splitgraph installation consists of two components: the
Splitgraph engine and the Splitgraph client (`sgr`).

The engine is a Docker container with a customized version of PostgreSQL
running on it. This is where cached images are stored.

The client is a Python commandline tool that interacts with the engine.

Most functionality is implemented in the client and to any other
application, the engine is just another PostgreSQL database: it can
interact with it by querying tables and writing to them as usual.

To run this demo, you will need to either be able to run Docker (to use
the official Splitgraph engine) or have access to a PostgreSQL (&gt;
9.6) database (in which case some functionality won't be available).

`sgr`, the Splitgraph command line client and library can be installed
either from [GitHub](https://github.com/splitgraph/splitgraph/) or from
pip:

    $ pip install --index-url https://test.pypi.org/simple/ splitgraph

You will need to be running Python 3.6 or later. For Linux systems, a single
self-contained binary is available on the [releases page](https://github.com/splitgraph/splitgraph/releases).

### Official Splitgraph engine

Use Docker to pull and start the
[engine](https://hub.docker.com/r/splitgraph/driver/):

    $ docker run -d \
    -e POSTGRES_PASSWORD=supersecure \
    -p 5432:5432 \
    splitgraph/driver

By default, `sgr` is configured to speak to the engine running on
`localhost:5432` with a superuser account called `sgr` and a password
`supersecure` against a database called `splitgraph`. To complete the
installation, run:

    $ sgr init

### Local Postgres

If you don't want or can't use Docker, you can also run `sgr` against
any other Postgres database. Most Splitgraph functionality will still be
available and you will still be able to download and share images as well
as follow the instructions in this demo. However, you won't be able to:

  * Push/pull images directly to other Splitgraph engines (as opposed to the default behaviour of downloading them from S3-compatible storage) or mount other databases: this requires the Postgres Foreign Data Wrapper extensions to be installed). 
  * Use layered querying which allows to run SQL queries against Splitgraph images without materializing them, by only querying and downloading a subset of every table.

After installing `sgr`, run the configurator to generate a base config
file:

    $ sgr config --config-format --no-shielding | tee .sgconfig
    [defaults]
    SG_NAMESPACE=sg-default-ns
    SG_ENGINE_HOST=localhost
    SG_ENGINE_PORT=5432
    SG_ENGINE_DB_NAME=splitgraph
    SG_ENGINE_USER=sgr
    SG_ENGINE_PWD=supersecure
    SG_ENGINE_ADMIN_USER=sgr
    SG_ENGINE_ADMIN_PWD=supersecure
    SG_ENGINE_POSTGRES_DB_NAME=postgres
    SG_CONFIG_FILE=.sgconfig
    SG_META_SCHEMA=splitgraph_meta
    SG_CONFIG_DIRS=
    SG_CONFIG_DIR=
    SG_REPO_LOOKUP=
    SG_REPO_LOOKUP_OVERRIDE=
    SG_S3_HOST=localhost
    SG_S3_PORT=9000
    SG_S3_KEY=
    SG_S3_PWD=

Open `.sgconfig` and change `SG_ENGINE_HOST`, `SG_ENGINE_PORT`,
`SG_ENGINE_DB_NAME`, `SG_ENGINE_USER` and `SG_ENGINE_PWD` appropriate to
your Postgres installation. Finally, initialize the engine:

    $ sgr init
    
    2019-01-01 15:21:43,794 INFO Creating database splitgraph
    2019-01-01 15:21:44,416 INFO Installing the audit trigger...
    2019-01-01 15:21:44,500 INFO Ensuring metadata schema splitgraph_meta exists...

Splitgraph reads its configuration from the overridden environment
variables first, then the `.sgconfig` file in the local working
directory (unless overridden by the `SG_CONFIG_FILE` environment
variable, then uses the default values. For more information, see the
documentation for splitgraph.config.
