---
id: image_information
title: Image information
---

## log
Show the history of a Splitgraph repository.

By default, this shows the history of the current branch, starting from the HEAD pointer and following its
parent chain.

If ``-t`` or ``--tree`` is passed, this instead renders the full image tree. The repository doesn't need to have
been checked out in this case.

## diff
Show differences between two Splitgraph images.

The two images must be in the same repository. The actual targets of this command depend
on the number of arguments passed:

``sgr diff REPOSITORY``

    Return the differences between the current HEAD image and the checked out schema.

``sgr diff REPOSITORY TAG_OR_HASH``

    Return the differences between the image and its parent.

``sgr diff REPOSITORY TAG_OR_HASH_1 TAG_OR_HASH_2``

    Return the differences from the first (earlier) image to the second image.

## show
Show information about a Splitgraph image. This includes its parent, comment and creation time.

Image spec must be of the format ``[NAMESPACE/]REPOSITORY[:HASH_OR_TAG]``. If no tag is specified, ``HEAD`` is used.

## sql
Run an SQL statement against the Splitgraph engine.

There are no restrictions on the contents of the statement: this is the same as running it
from any other PostgreSQL client.

If ``--schema`` is specified, the statement is run with the ``search_path`` set to that schema. This means
that these statements are equivalent::

    sgr sql "SELECT * FROM "noaa/climate".table"
    sgr sql -s noaa/climate "SELECT * FROM table"

## status
Show the status of the Splitgraph engine. If a repository is passed, show information about
the repository. If not, show information about all repositories local to the engine.

