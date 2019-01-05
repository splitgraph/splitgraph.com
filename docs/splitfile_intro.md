---
id: splitfile_intro
title: Introduction 
---

Splitfiles are similar to Dockerfiles: each command produces a new
commit with a deterministic hash that depends on the current hash and
the particulars of a command that's being executed.

The Splitfile is parsed using parsimonious, a Python parser library. The
exact grammar is in `splitgraph.splitfile.SGFILE_GRAMMAR` and there is
some quality-of-life preprocessing that gets done to the file before
it's interpreted:

-   Newlines can be escaped to make a command multiline (`"\\n"` gets
    replaced with `""`)
-   Parameters are supported (`${PARAM}` is replaced with the value of
    the parameter that's either passed to the `execute_commands` as a
    dict or to the commandline `sgr build` as a series of arguments
    (`-a key1 val1 -a key2 val2...`)).

Repository lookups
------------------

Currently, a repository name is resolved as follows:

-   See if it exists locally. If it does, try to pull it (to update) and use it for
    `FROM`/`IMPORT` commands.
-   If not, see if it's specified in the `SG_REPO_LOOKUP_OVERRIDE`
    parameter which has the format
    `repo_1:user:pwd@host:port/db,repo_2:user:pwd@host:port/db...`.
    Return the matching connection string directly without testing to
    see that the repository exists there.
-   If not, scan the `SG_REPO_LOOKUP` parameter which has the format
    `user:pwd@host:port/db,user:pwd@host:port/db...`, stopping at the
    first remote that has it.
