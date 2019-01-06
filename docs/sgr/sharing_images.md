---
id: sharing_images
title: Sharing images
---

## clone
Clone a remote Splitgraph repository into a local one.

The lookup path for the repository is governed by the ``SG_REPO_LOOKUP`` and ``SG_REPO_LOOKUP_OVERRIDE``
config parameters and can be overriden by the command line ``--remote`` option.

## push
Push changes from a local repository to the upstream.

The actual destination is decided as follows:

  * Remote engine: ``remote`` argument (either engine alias as specified in the config or a connection string,
    then the upstream configured for the repository.

  * Remote repository: ``remote_repository`` argument, then the upstream configured for the repository, then
    the same name as the repository.

``-h`` and ``-o`` allow to upload the objects to somewhere else other than the external drivers. Currently,
uploading to an S3-compatible host via Minio is supported: see :mod:`splitgraph.hooks.s3` for information
on handler options and how to register a new upload handler.

## pull
Pull changes from an upstream repository.

## publish
Publish tagged Splitgraph images to the catalog.

Only images with a tag can be published. The image must have been pushed
to the registry beforehand with ``sgr push``.

## upstream
Get or set the upstream for a repository.

This shows the default repository used for pushes and pulls as well as allows to change it to a different
remote engine and repository.

The remote engine alias must exist in the config file.

Examples:

``sgr upstream my/repo --set splitgraph.com username/repo``

    Sets the upstream for ``my/repo`` to ``username/repo`` existing on the ``splitgraph.com`` engine

``sgr upstream my/repo --reset``

    Removes the upstream for ``my/repo``.

``sgr upstream my/repo``

    Shows the current upstream for ``my/repo``.

