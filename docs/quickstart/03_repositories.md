Introduction to repositories
----------------------------

A Splitgraph repository is a collection of images, which themselves are
collections of tables. If you're familiar with Git, you can treat an
image as a Git commit and a table -- as the version of a file in a
certain commit. Much like Git, Splitgraph allows you to create database
images, track changes to them and check them out.

In this quickstart, we'll create a couple of example repositories and
some images and then use the Splitfile language to define a reproducible
transformation on these datasets.

`sgr` comes with a few routines to set up repositories with some example
data. Let's do that right now:

    sgr example generate example/repo_1

This creates a single repository, `example/repo_1`, with a single table
in it called `demo`. The table has two columns, `key` (an integer) and
`value` (a random hexadecimal string).

In addition, `sgr` also checks the repository out into a PostgreSQL
schema with the same name. This means that any application that can
access the engine via a normal database connection can interact with the
checked-out repository.

`sgr` provides a shorthand, `sgr sql` to run arbitrary SQL queries
against the engine:

    sgr sql --schema example/repo_1 "SELECT * FROM demo"

If you run this, you should see 10 rows of data.

You can also inspect the currently checked out image in-depth:

    sgr show --verbose example/repo_1:latest

    Image example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d06a643d0b50ce5f74f35ad1e3c7

    Created at 2019-01-01T14:07:57.042234
    Parent: 0000000000000000000000000000000000000000000000000000000000000000

    Tables:
      demo: o8781a2d30bc731a00650ff9833a5bcc65d22597059f5d619dfe3549a7325a9 (SNAP)

This image has a parent with hash `00000...`, denoting an empty image,
and one table, `demo`. This table is mapped to an object of type `SNAP`,
meaning that it's stored as a full table snapshot.

