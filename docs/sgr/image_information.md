---
id: image_information
title: Image information
---

## log

```sgr log [OPTIONS] REPOSITORY```

Show the history of a Splitgraph repository.

By default, this shows the history of the current branch, starting from the HEAD pointer and following its
parent chain.

If ``-t`` or ``--tree`` is passed, this instead renders the full image tree. The repository doesn't need to have
been checked out in this case.

### Options

  * **`-t, --tree`**: 

## diff

```sgr diff [OPTIONS] REPOSITORY [TAG_OR_HASH_1] [TAG_OR_HASH_2]```

Show differences between two Splitgraph images.

The two images must be in the same repository. The actual targets of this command depend
on the number of arguments passed:

``sgr diff REPOSITORY``

Return the differences between the current HEAD image and the checked out schema.

``sgr diff REPOSITORY TAG_OR_HASH``

Return the differences between the image and its parent.

``sgr diff REPOSITORY TAG_OR_HASH_1 TAG_OR_HASH_2``

Return the differences from the first (earlier) image to the second image.

### Options

  * **`-v, --verbose`**: Include the actual differences rather than just the total number of updated rows.
  * **`-t, --table-name TEXT`**: Show the differences for a single table.

## object

```sgr object [OPTIONS] OBJECT_ID```

Show information about a Splitgraph object.

Objects, or fragments, are building blocks of Splitgraph tables: each table consists of multiple immutable fragments
that can partially overwrite each other. Each fragment might have a parent that it depends on. In addition,
the smallest and largest values for every column are stored in the fragment's metadata. This information is used
to choose which objects to download in order to execute a query against a table.

## show

```sgr show [OPTIONS] IMAGE_SPEC```

Show information about a Splitgraph image. This includes its parent, comment and creation time.

Image spec must be of the format ``[NAMESPACE/]REPOSITORY[:HASH_OR_TAG]``. If no tag is specified, ``HEAD`` is used.

### Options

  * **`-v, --verbose`**: Also show all tables in this image and the objects they map to.

## sql

```sgr sql [OPTIONS] SQL```

Run an SQL statement against the Splitgraph engine.

There are no restrictions on the contents of the statement: this is the same as running it
from any other PostgreSQL client.

If ``--schema`` is specified, the statement is run with the ``search_path`` set to that schema. This means
that these statements are equivalent::

    sgr sql "SELECT * FROM "noaa/climate".table"
    sgr sql -s noaa/climate "SELECT * FROM table"

### Options

  * **`-s, --schema TEXT`**: Run SQL against this schema.
  * **`-a, --show-all`**: Returns all results of the query.

## status

```sgr status [OPTIONS] [REPOSITORY]```

Show the status of the Splitgraph engine. If a repository is passed, show information about
the repository. If not, show information about all repositories local to the engine.

