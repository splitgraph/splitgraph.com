---
id: splitfile_sql
title: SQL 
---

**`SQL command`**

Runs a (potentially arbitrary) SQL statement. Doesn't enforce any
constraints on the SQL yet, but the spirit of this command is
performing actions on tables in the current `OUTPUT` repository (the
command is executed with the `OUTPUT` schema being the default one)
and not changing/reading data from any other schemas.

The image hash produced by this command is a combination of the current
`OUTPUT` hash and the hash of the "canonicalized" SQL statement (all
lowercase with excess whitespace removed). This might cause issues with
us not invalidating layers when an identifier inside a command changed
case: then the results would change but the image returned by the
command would still have the same hash.

In the future, it might be worth basing the new hash on the hash of the
objects that the query actually interacts with (as inputs or outputs),
but this will require actually parsing the query.
