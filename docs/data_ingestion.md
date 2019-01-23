---
id: data_ingestion
title: Data ingestion
---

## Introduction

Since a checked-out Splitgraph repository is just another PostgreSQL schema, you can write data to it using any Postgres client. However, this is not the only method of data ingestion: PostgreSQL also supports so-called Foreign Data Wrappers: plugins that allow a user to write a custom handler for any external data source, representing it as a set of foreign tables. Foreign tables act similarly to normal tables and can accept the same SQL queries, so using Splitgraph extends on this idea by building up some scaffolding around foreign data wrappers allowing the user to mount external databases into the engine from the `sgr` command line client or a Splitfile. These mounted tables can then be snapshotted and turned into Splitgraph images with just one command.

The Splitgraph engine ships with several open-source foreign data wrappers: [`postgres_fdw`](https://www.postgresql.org/docs/10/postgres-fdw.html), [`mongo_fdw`](https://github.com/EnterpriseDB/mongo_fdw) and [`mysql_fdw`](https://github.com/EnterpriseDB/mysql_fdw).

## Example usage

To run this, you'll need a MongoDB database handy:

```
$ sgr mount mongo_fdw example/mongo -c username:password@mongo_host:27017 -o '{"example_table": {"db": "example_db", "coll": "example_collection", "schema": {"column_1": "text", "column_2": "numeric"}}}'
```

This will create a schema called `example/mongo` on your engine, mounting the MongoDB database from `mongo_host:27017`. The schema will contain one foreign table, `example_table`, that will contain documents from the collection `example_collection` in the database `example_db`. The table will have 2 columns, `column_1` and `column_2`, populated from the documents in that collection.

Note that this doesn't actually ingest any data from the remote database: if you query this foreign table, the query
will be converted to a MongoDB query behind the scenes and forwarded to the target database:

```
$ sgr sql -s example/mongo "SELECT * FROM example_table"
``` 

To snapshot the table, making it part of an actual Splitgraph image, use the `sgr import` command:

```
$ sgr import example/mongo "select column_1, column_2 from example_table" example/mongo_repo example_table
example/mongo_repo:example_table has been imported from example/mongo:select column_1, column_2 from example_table
```

`sgr import` can also be used to import tables between Splitgraph repositories without consuming extra space. For more information, see the [command line reference](sgr/image_management_creation#import).

## Writing a custom mount handler

To mount a custom database into your Splitgraph engine, you have to do three things: 

  * Install the foreign data wrapper into the engine (either using PGXN or compiling the wrapper by yourself)
  * Write a Python function that, when invoked, will create the required mountpoint on the engine and initialize
    the remote foreign data wrapper. For an example, see `mount_postgres` in `splitgraph.hooks.mount_handlers`.
  * Register the handler in your `.sgconfig` file:
    ``` 
    [mount_handlers]
    handler_name=your.handler.module.handler_function
    ```
 
Registering the handler in such a way will also parse its function signature and docstring, adding the handler automatically to the `sgr` client as a subcommand, as well as making it available to be used in Splitfiles.

For example, the `mount_postgres` function: 

```
def mount_postgres(mountpoint, server, port, username, password, dbname, remote_schema, tables=[]):
    """
    Mount a Postgres database.

    Mounts a schema on a remote Postgres database as a set of foreign tables locally.
    \b

    :param mountpoint: Schema to mount the remote into.
    :param server: Database hostname.
    :param port: Port the Postgres server is running on.
    :param username: A read-only user that the database will be accessed as.
    :param password: Password for the read-only user.
    :param dbname: Remote database name.
    :param remote_schema: Remote schema name.
    :param tables: Tables to mount (default all).
    """
    engine = get_engine()
    logging.info("Importing foreign Postgres schema...")

    # Name foreign servers based on their targets so that we can reuse them.
    server_id = '%s_%s_%s_server' % (server, str(port), dbname)
    init_fdw(engine, server_id, "postgres_fdw", {'host': server, 'port': str(port), 'dbname': dbname},
             {'user': username, 'password': password}, overwrite=False)

    engine.run_sql(SQL("CREATE SCHEMA {}").format(Identifier(mountpoint)))

    # Construct a query: import schema limit to (%s, %s, ...) from server mountpoint_server into mountpoint
    query = "IMPORT FOREIGN SCHEMA {} "
    if tables:
        query += "LIMIT TO (" + ",".join("%s" for _ in tables) + ") "
    query += "FROM SERVER {} INTO {}"
    engine.run_sql(SQL(query).format(Identifier(remote_schema), Identifier(server_id),
                                     Identifier(mountpoint)), tables)
``` 

gets made available in the `sgr` client with this help message:

```
$ sgr mount postgres_fdw --help
Usage: sgr mount postgres_fdw [OPTIONS] SCHEMA

      Mount a Postgres database.

      Mounts a schema on a remote Postgres database as a set of foreign
      tables locally.

Options:
  -c, --connection TEXT       Connection string in the form
                              username:password@server:port
  -o, --handler-options TEXT  JSON-encoded dictionary of handler options:
                              dbname: Remote database name.
                              remote_schema:
                              Remote schema name.
                              tables: Tables to mount
                              (default all).
  --help                      Show this message and exit.
```

The connection string gets parsed and passed to the mount handler as `server`, `port`, `username` and `password` parameters. The remaining options are converted from a JSON dictionary and passed to the handler as extra kwargs. 