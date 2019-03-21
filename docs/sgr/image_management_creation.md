---
id: image_management_creation
title: Image management/creation
---

## checkout

```sgr checkout [OPTIONS] IMAGE_SPEC```

Check out a Splitgraph image into a Postgres schema.

This downloads the required physical objects and materializes all tables, unless ``-l`` or ``--layered`` is passed,
in which case the objects are downloaded and a foreign data wrapper is set up on the engine to satisfy read-only
queries by combining results from each table's DIFF objects.

Tables checked out in this way are still presented as normal Postgres tables and can queried in the same way.
Since the tables aren't materialized, layered querying is faster to set up, but since each query now results in a
subquery to each object comprising the table, actual query execution is slower than to materialized Postgres tables.

Layered querying is only supported for reading from tables and only with the official Splitgraph engine.

Image spec must be of the format ``[NAMESPACE/]REPOSITORY[:HASH_OR_TAG]``. Note that currently, the schema that the
image is checked out into has to have the same name as the repository. If no image hash or tag is passed,
"HEAD" is assumed.

If ``-u`` or ``--uncheckout`` is passed, this instead deletes the checked out schema (assuming there are no pending
changes) and removes the HEAD pointer.

If ``--force`` isn't passed and the schema has pending changes, this will fail.

### Options

  * **`-f, --force`**: Discard all pending changes to the schema
  * **`-u, --uncheckout`**: Delete the checked out copy instead
  * **`-l, --layered`**: Don't materialize the tables, use layered querying instead.

## commit

```sgr commit [OPTIONS] REPOSITORY```

Commit changes to a checked-out Splitgraph repository.

This packages up all changes into a new image. Where a table hasn't been created or had its schema changed,
this will delta compress the changes. For all other tables (or if ``-s`` has been passed), this will
store them as full table snapshots.

### Options

  * **`-s, --snap`**: Store the table as a full table snapshot. This consumes more space, but makes checkouts faster.
  * **`-m, --message TEXT`**: Optional commit message

## tag

```sgr tag [OPTIONS] IMAGE_SPEC [TAG]```

Manage tags on images.

Depending on the exact invocation, this command can tag a Splitgraph image,
list all tags in a repository or delete a tag.

### Examples

``sgr tag noaa/climate``

List all tagged images in the ``noaa/climate`` repository and their tags.

``sgr tag noaa/climate:abcdef1234567890``

List all tags assigned to the image ``noaa/climate:abcdef1234567890...``

``sgr tag noaa/climate:abcdef1234567890 my_new_tag``

Tag the image ``noaa/climate:abcdef1234567890...`` with ``my_new_tag``. If the tag already exists, this will
raise an error, unless ``-f`` is passed, which will overwrite the tag.

``sgr tag noaa/climate my_new_tag``

Tag the current ``HEAD`` of ``noaa/climate`` with ``my_new_tag``.

``sgr tag --remove noaa/climate:my_new_tag``

Remove the tag ``my_new_tag`` from ``noaa/climate``.

### Options

  * **`-f, --force`**: Overwrite the tag if it already exists.
  * **`-r, --remove`**: Remove the tag instead.

## import

```sgr import [OPTIONS] IMAGE_SPEC TABLE_OR_QUERY TARGET_REPOSITORY [TARGET_TABLE]```

Import tables into a Splitgraph repository.

Imports a table or a result of a query from a local Splitgraph repository or a Postgres schema into another
Splitgraph repository.

### Examples

``sgr import noaa/climate:my_tag climate_data my/repository``

Create a new image in ``my/repository`` with the ``climate_data`` table included. This links the new image to
the physical object, meaning that the history of the ``climate_data`` table is preserved.

If no tag is specified, the 'latest' (not the HEAD image or current state of the checked out image)
image is used.

``sgr import noaa/climate:my_tag "SELECT * FROM climate_data" my/repository climate_data``

Create a new image in ``my/repository`` with the result of the query stored in the ``climate_data`` table. This
creates a new physical object without any linkage to the original data, so the history of the ``climate_data``
table isn't preserved. The SQL query can interact with multiple tables in the source image.

``sgr import other_schema other_table my/repository``

Since other_schema isn't a Splitgraph repository, this will copy ``other_schema.other_table``
into a new Splitgraph object and add the ``other_table`` table to a new image in ``my/repository``.

Note that importing doesn't discard or commit pending changes in the target Splitgraph repository: a new image
is created with the new table added, the new table is materialized in the repository and the HEAD pointer is moved.

