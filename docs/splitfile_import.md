---
id: splitfile_import
title: IMPORT 
---

**`FROM (repository[:tag])/(MOUNT handler conn_string handler_options)
    IMPORT table1/{query1} [AS table1_alias], [table2/{query2}...]`**

Uses the `sgr import` command to import one or more tables from
either a local repository, a remote one, or an FDW-mounted database.

Optionally, the table name can be replaced with a SELECT query in curly
braces that will get executed against the source repository in order to
create a table. This will be stored as a snapshot. For example:

**`FROM internal_data:latest IMPORT {SELECT name, age FROM staff WHERE is_restricted = FALSE} AS visible_staff`**

Will create a new table that contains non-restricted staff names and
ages in `internal_data.staff` without including any other entries in
the table history.

In the case of imports from FDW, the commit hash produced by this
command is random. Otherwise, the commit hash will be a combination
of the current `OUTPUT` hash, the hash of the source repository and
the hashes of the names (or source SQL queries) and aliases of all
imported tables.

This is crude, but means that the layer is invalidated if there's a
change on the remote or we import a different table/name it
differently/use a different query to create a table. We can improve on
this by perhaps only considering the objects and table aliases that are
actually imported (as opposed to the source image hash: maybe the tables
we're importing haven't changed even if other parts of the repository
have).