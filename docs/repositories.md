---
id: repositories
title: Repositories
---

## Introduction

A Splitgraph repository is a collection of images, which themselves are
collections of tables. If you're familiar with Git, you can treat an
image as a Git commit and a table as the version of a file in a
certain commit. Much like Git, Splitgraph allows you to create database
images, track changes to them and check them out.

In this quickstart, we'll create a couple of example repositories and
some images and then use the Splitfile language to define a reproducible
transformation on these datasets.

`sgr` comes with a few routines to set up repositories with some example
data. Let's do that right now:

    $ sgr example generate example/repo_1

This creates a single repository, `example/repo_1`, with a single table
in it called `demo`. The table has two columns, `key` (an integer) and
`value` (a hexadecimal string).

In addition, `sgr` also checks the repository out into a PostgreSQL
schema with the same name. This means that any application that can
access the engine via a normal database connection can interact with the
checked-out repository.

`sgr` provides a shorthand, `sgr sql`, to run arbitrary SQL queries
against the engine:

    $ sgr sql --schema example/repo_1 "SELECT * FROM demo"

If you run this, you should see 10 rows of data.

You can also inspect the currently checked out image in-depth:

    $ sgr show --verbose example/repo_1:latest

    Image example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d06a643d0b50ce5f74f35ad1e3c7

    Created at 2019-01-01T14:07:57.042234
    Parent: 0000000000000000000000000000000000000000000000000000000000000000

    Tables:
      demo: o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166

This image has a parent with hash `00000...`, denoting an empty image,
and one table, `demo`. This table is currently mapped to a single object and
is stored as a full-table snapshot.

## Repository manipulation

A checked out repository also has change tracking enabled, so any
writes to that schema by any application will be captured, allowing
Splitgraph to package them into new images. In particular, changes to
preexisting tables will be stored as delta-compressed patches
so that keeping track of table history is space efficient.

Let's create another example repository and give the new image a tag:

    $ sgr example generate example/repo_2
    $ sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"
    $ sgr tag example/repo_2 original_data

The next step can be done from any application that can access the
PostgreSQL database backing the Splitgraph engine, but `sgr` provides a
shorthand to alter the generated image:

    $ sgr example alter example/repo_2
    
    Deleting 2 rows...
    Updating 2 rows...
    Adding 2 rows...

Let's inspect the current state of the repository:

    $ sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

You should see that the first two rows are now missing, the second two
rows have been altered and two more rows have been added.

Let's compare the `demo` table to its previous version:

    $ sgr diff example/repo_2 -v
    
    Between 6881def87f34 and the current working copy: 
    demo: added 4 rows, removed 4 rows.
    - (0, '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9')
    - (1, '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b')
    - (2, 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35')
    - (3, '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce')
    + (2, 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35_UPDATED')
    + (3, '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce_UPDATED')
    + (10, '4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5')
    + (11, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8')

Let's commit the changes to the new repository to create a new image:

    $ sgr commit example/repo_2 --message "My first image"
    $ sgr show --verbose example/repo_2:latest
    
    Image example/repo_2:a0057ef93849ce853b3c2a7268814cabdb6ba733cfd1f3b23a19ea719e11a98d
    My first image
    Created at 2019-01-01T14:23:33.641988
    Parent: 6881def87f34aa1d7501d2960719fd6b5df9c392053278eade089b3186ee8407

    Tables:
      demo: oa0f257670aa3a39444b5d03364d9abfcaa8c7f3fce970fde3b5d63d6ed3fb6

The `demo` table is stored as a new object in this image and only the 6 changed rows
have been stored in it, as opposed to the whole table.

Tag the new image and check out the old one:

    $ sgr tag example/repo_2 new_data
    $ sgr checkout example/repo_2:original_data
    $ sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

You should see the original contents of the table before all changes.
Check out the new copy:

    $ sgr checkout example/repo_2:new_data
    $ sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

Behind the scenes, this replays the changes packaged up in the patch 
object against the original copy of the table.

## More on Splitgraph objects

Let's further inspect the object that the first example image, `example/repo_1`, used.

    $ sgr object o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166
    
    Object ID: o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166
    
    Parent: None
    Namespace: example
    Format: FRAG
    Size: 8.00 KiB
    Insertion hash: 37be08d7c1aca256f5e64860afe7db21e6f7c47b00cdf23f65b84576bc209f41
    Deletion hash: 0000000000000000000000000000000000000000000000000000000000000000
    Column index:
      key: [0, 9]
      value: ['19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7', 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d']
    
    Location: created locally

There are a few interesting things in this object's metadata. Firstly, it's stored in the `FRAG` format.
A Splitgraph table consists of multiple fragments that can partially overwrite each other. In this case,
the object has no parent so it doesn't overwrite any other fragments.

Every fragment also has a column index: this is a metadata entry showing, for every column, the minimum
and maximum values that this fragment affects (deletes or inserts). This is used when querying large remote
Splitgraph tables to not download fragments that definitely don't match a given query. For qualifiers on sorted
columns (like the primary key), this can mean only downloading one or two fragments to satisfy a query to a table
composed of hundreds.

Finally, every fragment also has an insertion and a deletion hash: the insertion hash is the hash of all the rows
that this fragment inserts and the deletion hash is the hash of all the rows that this fragment deletes. These hashes
are homomorphic (every row is hashed individually and then the hashes are summed up) and inspired by Facebook's
[LtHash](https://code.fb.com/security/homomorphic-hashing/). They have a really important property: the sum of all
hashes of individual fragments composing a table is equal to the content hash of a whole table. This is used in
deduplicating data and optimizing storage.

The object ID is deterministic and is generated by combining the content hash (insertion - deletion hash), the
hash of the schema and the parent ID of a given object. This means that Splitgraph fragments are content-addressable.

Now, let's look at the second object that the new version of the `demo` table in `example/repo_2:new_data` is linked to.

    $ sgr object oa0f257670aa3a39444b5d03364d9abfcaa8c7f3fce970fde3b5d63d6ed3fb6
    
    Object ID: oa0f257670aa3a39444b5d03364d9abfcaa8c7f3fce970fde3b5d63d6ed3fb6
    
    Parent: o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166
    Namespace: example
    Format: FRAG
    Size: 8.00 KiB
    Insertion hash: aa15011c4af8e7afb877b5de68ab782b69d63720ba5787bec54fbcd6838fb377
    Deletion hash: 7463a64e15187558e6e1096368033dfab422b34503c20e94a83b7a3e4650df68
    Column index:
      key: [0, 11]
      value: ['4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5', 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35_UPDATED']
    
    Location: created locally

As you can see, this new object is based on the object that was used by the very first version
of the data we generated (`o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166`). This
is because the demo data is static and so the first version of the `demo` table in `example/repo_1` and
`example/repo_2` is in fact the same.

Since this object updates and deletes some rows, their values are included in its deletion hash, which is now non-zero.

Finally, the column index now spans all the values of the `key` column that were replaced or added. Hence, when there's
a query against this table that is inside that range, both fragments will be fetched to check if they match
that query.

We can also inspect the actual object: every object in the Splitgraph cache is stored as a
[CStore](https://github.com/citusdata/cstore_fdw) columnar storage file.

    $ sgr sql "SELECT * FROM splitgraph_meta.oa0f257670aa3a39444b5d03364d9abfcaa8c7f3fce970fde3b5d63d6ed3fb6"
    
    [(True,
      2,
      'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35_UPDATED'),
     (True,
      3,
      '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce_UPDATED'),
     (True, 10, '4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5'),
     (True, 11, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
     (False, 0, None),
     (False, 1, None)]

The object is stored with the same schema as the original table, plus a Boolean flag showing whether a row has been
updated/inserted (upserted) or deleted. For deleted rows, only the primary key is recorded and the rest of the table
is padded with `NULL`s.

Splitgraph objects aren't always stored in the engine: when an image is pushed to an external location,
they are usually uploaded to an S3-compatible storage.