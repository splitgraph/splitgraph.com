---
id: splitfile_execution
title: Splitfile execution
---

## build

```sgr build [OPTIONS] SPLITFILE```

Build Splitgraph images.

This executes a Splitfile, building a new image or checking it out from cache if the same
image had already been built.

### Examples

``sgr build my.splitfile``

Executes ``my.splitfile`` and writes its output into a new repository with a random name unless
the name is specified in the Splitfile.

``sgr build my.splitfile -o mynew/repo``

Executes ``my.splitfile`` and writes its output into ``mynew/repo``.

``sgr build my_other.splitfile -o mynew/otherrepo --args PARAM1 VAL1 --args PARAM2 VAL2``

Executes ``my_other.splitfile`` with parameters ``PARAM1`` and ``PARAM2`` set to
``VAL1`` and  ``VAL2``, respectively.

### Options

  * **`-a, --args <TEXT TEXT>...`**: Parameters to be substituted into the Splitfile. All parameters mentioned in the file must be specified in order for the Splitfile to be executed.
  * **`-o, --output-repository REPOSITORY`**: Repository to store the result in.

## rebuild

```sgr rebuild [OPTIONS] IMAGE_SPEC```

Rebuild images against different dependencies.

Examines the provenance of a Splitgraph image created by a Splitfile and reruns it against different images than
the ones that were imported by the original run.

### Examples

``sgr rebuild my/repo --against noaa/climate:old_data``

Reconstructs the Splitfile used to create ``my/repo:latest``, replaces all imports from ``noaa/climate`` with
imports from ``noaa/climate:old_data`` and reruns the Splitfile.

``sgr rebuild my/repo:other_tag -u``

Rebuilds ``my_repo:other_tag`` against the latest versions of all of its dependencies.

Image caching still works in this case: if the result of the rebuild already exists, the image will be checked
out.

### Options

  * **`-u, --update`**: Rederive the image against the latest version of all dependencies.
  * **`-a, --against IMAGE`**: Images to substitute into the reconstructed Splitfile, of the form [NAMESPACE/]REPOSITORY[:HASH_OR_TAG]. Default tag is 'latest'.

## provenance

```sgr provenance [OPTIONS] IMAGE_SPEC```

Reconstruct the provenance of an image.

This crawls the history of a Splitgraph image to produce a list of images that were used by the Splitfile
that created it, or a Splitfile with the same effect.

``IMAGE_SPEC`` must be of the form ``[NAMESPACE/]REPOSITORY[:HASH_OR_TAG]``.
If no tag is specified, ``latest`` is used.

### Examples

Assume ``my/repo`` is produced by the following Splitfile:

    FROM MOUNT [...] IMPORT external_table
    FROM noaa/climate IMPORT {SELECT * FROM rainfall_data WHERE state = 'AZ'} AS rainfall_data

``my/repo`` will have 2 images: one having ``hash_1`` (with the ``external_table`` imported from a mounted database)
and one having ``hash_2`` (with both ``external_table`` and the ``rainfall_data`` containing the result
of the query run against the then-latest image in the ``noaa/climate`` repository).

In this case:

``sgr provenance my/repo``

Returns a list of repositories and images that were imported by the Splitfile that constructed this image::

    my/repo:[hash_2] depends on:
    noaa/climate:[hash_3]

Where ``hash_3`` is the hash of the latest image in the ``noaa/climate`` repository at the time the original
Splitfile was run. However:

``sgr provenance -f my/repo``

Will try to reconstruct the Splitfile that can be used to build this image. Since the FROM MOUNT command isn't
reproducible (requires access to the original external database, which is a moving target), this will fail.

If ``-e`` is passed, this will base the image on the first image that can't be reproduced:

    sgr provenance -ef my/repo

    # Splitfile commands used to reconstruct my/repo:[hash of the second layer]
    FROM my/repo:[hash_1]
    FROM noaa/climate:[hash_3] IMPORT {SELECT * FROM rainfall_data WHERE state = 'AZ'}

### Options

  * **`-f, --full`**: Recreate the Splitfile used to create this image
  * **`-e, --error-on-end`**: If False, bases the recreated Splitfile on the last image where the provenance chain breaks

