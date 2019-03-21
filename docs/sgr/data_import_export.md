---
id: data_import_export
title: Data import/export
---

## csv export

```sgr export [OPTIONS] IMAGE_SPEC QUERY```

Export the result of a query as CSV.

### Examples

`sgr csv export noaa/climate "SELECT * FROM rainfall"`

Output everything in the currently checked-out `"rainfall"` table as CSV.

`sgr csv export noaa/climate:dec_2018 "SELECT * FROM rainfall WHERE state = 'AZ' -f dec_2018_az.csv`

Check out the `dec_2018` tag of `noaa/climate` and output values from `"rainfall"` for Arizona to `dec_2018_az.csv`

`sgr csv export --layered noaa/climate:abcdef1234567890 "SELECT * FROM rainfall JOIN other_table ON..."`

Uses layered querying instead to execute a join on tables in a certain image (satisfying the query without
having to check the image out).

### Options

  * **`-f, --file FILENAME`**: File name to export to, default stdout.
  * **`-l, --layered`**: Don't materialize the tables, use layered querying instead.

## csv import

```sgr import [OPTIONS] REPOSITORY TABLE```

Import a CSV file into a checked-out Splitgraph repository. This doesn't create a new image, use `sgr commit`
after the import and any adjustments (e.g. adding primary keys or converting column types) to do so.

If the target table doesn't exist, this will create a new table.

If the target table does exist, this will try and patch the new values in by updating rows that exist in the
current table (as per its primary key constraints) and inserting new ones. Rows existing in the current table
but missing in the CSV won't be deleted.

If `-r` is passed, the table will instead be deleted and recreated from the CSV file if it exists.

### Options

  * **`-f, --file FILENAME`**: File name to import data from, default stdin.
  * **`-r, --replace`**: Replace the table if it already exists.
  * **`-k, --primary-key TEXT`**: Use the specified column(s) as primary key(s)
  * **`-d, --datetime TEXT`**: Try to parse the specified column(s) as timestamps.

## mount

```sgr mount [OPTIONS] ```

Mount foreign databases as Postgres schemas.

Uses the Postgres FDW interface to create a local Postgres schema with foreign tables that map
to tables in other databases.

See a given mount handler's documentation for handler-specific parameters.

