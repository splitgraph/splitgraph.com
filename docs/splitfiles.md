---
id: splitfiles
title: Introduction to Splitfiles
---

Whilst you can create new images using `sgr commit`, there is a better
way: Splitfiles. Splitfiles are a declarative way to define new datasets
inspired by Dockerfiles. The same ideas hold here: every command defines
a new image with a deterministic hash (a combination of the hash of the
previous image and the specifics of the command). If the hash that's
about to be produced by a command already exists, the image is checked
out instead, avoiding the actual data transformation.

This means that you can not only easily produce derivative datasets, but
also keep them up to date without extra effort.

In this demo, we'll run an SQL JOIN query on the two repositories that
we produced to match up the keys from the first table with the keys from
the second table.

`sgr` comes with a generator for this example Splitfile:

    $ sgr example splitfile example/repo_1 example/repo_2 | tee example.splitfile

    # Import the table from the latest image in the first repository
    FROM example/repo_1 IMPORT demo AS table_1

    # Import the table from a certain image (passed in as a parameter) in the second repository
    FROM example/repo_2:${IMAGE_2} IMPORT demo AS table_2

    # Create a join table
    SQL CREATE TABLE result AS SELECT table_1.key, table_1.value AS value_1,\
                                      table_2.value AS value_2\
                               FROM table_1 JOIN table_2\
                               ON table_1.key = table_2.key

This file consists of three commands:

-    Import the first `demo` table into the new image and call it
     `table_1`. One thing to note is that importing doesn't actually
     consume extra space in the image, since it just links the image to
     the original object representing the first `demo` table. Since we
     didn't specify an explicit image or tag, the latest image in
     `example/repo_1` will be used.
-    Do the same with the `example/repo_2` repository, but this time
     use a parameter `IMAGE_2` for the image. This parameter will have
     to be substituted in at Splitfile execution time to define the
     exact image we will want to use.
-    Finally, run an SQL statement against the newly built image with
     the two imported tables. In this case, we will create a new table
     (called `result`) and put the results of the JOIN query in it.

Let's run this Splitfile using the original data in the `example/repo_2`
repository:

    $ sgr build example.splitfile -o example/output --args IMAGE_2 original_data
    
    Executing Splitfile example.splitfile with arguments {'IMAGE_2': 'original_data'}

    Step 1/3 : FROM example/repo_1 IMPORT demo AS table_1
    Resolving repository example/repo_1
    Importing tables ('demo',):5fe74f282e33 from example/repo_1 into example/output
     ---> 73c258b9a244

    Step 2/3 : FROM example/repo_2:original_data IMPORT demo AS table_2
    Resolving repository example/repo_2
    Importing tables ('demo',):6881def87f34 from example/repo_2 into example/output
     ---> 9764d69bbc46

    Step 3/3 : SQL CREATE TABLE result AS SELECT table_1.key, table_1.va...
    Executing SQL...
    2019-01-01 14:47:41,368 INFO Committing example/output...
     ---> 96833d33a433

If you have seen the output of a Dockerfile being executed, this will
also look familiar to you. Let's inspect the repository that we've just
created:

    $ sgr log example/output
    
    H-> 96833d33a4333d33fd2490ca2ec8ebab83be5481cb17372b9a66e1518253a111 2019-01-01 14:47:41.385851 CREATE TABLE result...
        9764d69bbc46429bc897bfe114fefbca9202d39a5d1a6183d65d098133c73096 2019-01-01 14:47:41.302369 Importing ('table_2',) from example/repo_2
        73c258b9a244130f4b5a80adfb9c8c19d0186ca93ba447f2e5a91b68662bb840 2019-01-01 14:47:41.241848 Importing ('table_1',) from example/repo_1
        0000000000000000000000000000000000000000000000000000000000000000 2019-01-01 14:47:41.113029

    $ sgr show example/output:latest --verbose
    
    Image example/output:96833d33a4333d33fd2490ca2ec8ebab83be5481cb17372b9a66e1518253a111
    CREATE TABLE result AS SELECT ...
    Created at 2019-01-01T14:47:41.385851
    Parent: 9764d69bbc46429bc897bfe114fefbca9202d39a5d1a6183d65d098133c73096

    Tables:
      result: oc9ee54fcb5537f423fa3a4422a81c12a8b49e2d3704adde417eadbb05d737a
      table_1: o26c6d8345cba276f807d7bcf906531568f309c2609a3420d98c01a6c99b166
      table_2: oa0f257670aa3a39444b5d03364d9abfcaa8c7f3fce970fde3b5d63d6ed3fb6

Let's also look at the actual data we produced. Since we ran the
Splitfile against the original version of the `example/repo_2`
repository, all keys from 0 to 9 should be present in the join table:

    $ sgr sql --schema example/output "SELECT * FROM result ORDER BY key"
    
    [(0,
      '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9',
      '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9'),
     (1,
      '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
      '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'),
     (2,
      'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
      'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35'),
     (3,
      '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
      '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce'),
     (4,
      '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'),
     (5,
      'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'),
     (6,
      'e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683',
      'e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683'),
     (7,
      '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451',
      '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451'),
     (8,
      '2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3',
      '2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3'),
     (9,
      '19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7',
      '19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7')]


Finally, since each image at execution time has a deterministic hash,
rerunning the same Splitfile won't actually perform any computation:

    $ sgr build example.splitfile -o example/output --args IMAGE_2 original_data
    
    Executing Splitfile example.splitfile with arguments {'IMAGE_2': 'original_data'}

    Step 1/3 : FROM example/repo_1 IMPORT demo AS table_1
    Resolving repository example/repo_1
     ---> Using cache
     ---> 73c258b9a244

    Step 2/3 : FROM example/repo_2:original_data IMPORT demo AS table_2
    Resolving repository example/repo_2
     ---> Using cache
     ---> 9764d69bbc46

    Step 3/3 : SQL CREATE TABLE result AS SELECT table_1.key, table_1.va...
     ---> Using cache
     ---> 96833d33a433

For more information on the available Splitfile commands, see [the reference](splitfile_intro).
