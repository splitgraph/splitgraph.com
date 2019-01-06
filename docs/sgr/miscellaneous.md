---
id: miscellaneous
title: Miscellaneous
---

## mount
Mount foreign databases as Postgres schemas.

Uses the Postgres FDW interface to create a local Postgres schema with foreign tables that map
to tables in other databases.

See a given mount handler's documentation for handler-specific parameters.

## rm
Delete schemas, repositories or images.

If the target of this command is a Postgres schema, this performs DROP SCHEMA CASCADE.

If the target of this command is a Splitgraph repository, this deletes the repository and all of its history.

If the target of this command is an image, this deletes the image and all of its children.

In any case, this command will ask for confirmation of the deletion, unless ``-y`` is passed. If ``-r``
(``--remote``), is passed, this will perform deletion on a remote Splitgraph engine (registered in the config)
instead, assuming the user has write access to the remote repository.

This does not delete any physical objects that the deleted repository/images depend on:
use ``sgr cleanup`` to do that.

Examples:

``sgr rm temporary_schema``

    Deletes ``temporary_schema`` from the local engine.

``sgr rm --remote splitgraph.com username/repo``

    Deletes ``username/repo`` from the Splitgraph registry.

``sgr rm -y username/repo:old_branch``

    Deletes the image pointed to by ``old_branch`` as well as all of its children (images created by a commit based
    on this image), as well as all of the tags that point to now deleted images, without asking for confirmation.
    Note this will not delete images that import tables from the deleted images via Splitfiles or indeed the
    physical objects containing the actual tables.

## init
Initialize a new repository/engine.

Examples:

``sgr init``

    Initializes the current local Splitgraph engine by writing some bookkeeping information.
    This is required for the rest of sgr to work.

``sgr init new/repo``

    Creates a single image with the hash ``00000...`` in ``new/repo``

## cleanup
Prune unneeded objects from the engine.

This deletes all objects from the cache that aren't required by any local repository.

## prune
Cleanup dangling images from a repository.

This includes images not pointed to by any tags (or checked out) and those that aren't required by any of
such images.

Will ask for confirmation of the deletion, unless ``-y ``is passed. If ``-r`` (``--remote``) is
passed, this will perform deletion on a remote Splitgraph engine (registered in the config) instead, assuming
the user has write access to the remote repository.

This does not delete any physical objects that the deleted repository/images depend on:
use ``sgr cleanup`` to do that.

## config
Print the current Splitgraph configuration.

This takes into account the local config file, the default values
and all overrides specified via environment variables.

This command can be used to dump the current Splitgraph configuration into a file::

    sgr config --no-shielding --config-format > .sgconfig

...or save a config file overriding an entry::

    SG_REPO_LOOKUP=engine1,engine2 sgr config -sc > .sgconfig

