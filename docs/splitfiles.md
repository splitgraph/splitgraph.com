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
      table_1: o8781a2d30bc731a00650ff9833a5bcc65d22597059f5d619dfe3549a7325a9
      table_2: od5a45d033903aa9f8241e5d87e884360fcee56ca874ae12c7cc94942b84092
      result: o4be220f929a52b1c1eaa2c083a1fbcab0cbc4bdd3c9a634e6a331dbe92b990

Let's also look at the actual data we produced. Since we ran the
Splitfile against the original version of the `example/repo_2`
repository, all keys from 0 to 9 should be present in the join table:

    $ sgr sql --schema example/output "SELECT * FROM result ORDER BY key"
    
    [(0,
      'e3f8da4d6d906fc5b7d33a670b2b370bbe617c30a9b4b56cda901605b8cbc014',
      'da6b3aca32bbc1011aff3c57e453ab9e4e1be1f7373fc1f5a745d19e4f70d955'),
     (1,
      '649e8e3fd3c2afafafbdd1b822030f70e5068417bfb8575fce23419ea4eb2ff',
      '980766c6ad7d50f0abd0b23c52b88641c2cef27c69d8ae91387d31eafc4f5ef4'),
     (2,
      '1d8cdaef663c05d4792c692bfe3344d77935bd6d04ccf23f508dec2ae4f156fb',
      '53193b48f075f61de3be0d8c344d1795f4d5e69760cadb9a255fd7afd638cc7f'),
     (3,
      'c720af85b57634711987d4cc21bdecb7c68f8e76f7a39f3d9c5ffb500528f3e6',
      '9524f629b9fcf93db71a3f782761e3d197cb8ccf055cb47ed56547909c110938'),
     (4,
      'c7b40b97aff78b36ecaf694bb17f45d6779fb9ab35e7e8691028cc2b4a33d2c7',
      '2101df664248a539a9cb66c1e598211e1d11e485089e32583fff2d9ad3487993'),
     (5,
      '9f945d56c6df763a54f463a36e5139592c5cd50b74cd817e0aff29ec13694a9',
      '30ddd6e11c61e3242ebbfb9d4eee426da0cf2b1e6ea8dc135b5fce3d5757e02'),
     (6,
      '77c236d7da1a04c42a353a83b57225f54e48afead36610764c4021e06611f918',
      'efbea91e4e8ca2fbe7c7923896c90ae30092b409b7a796993c4da918f1e522ab'),
     (7,
      'c9fa6479320a5bd1cc7900e68f07ae81b11c1e7d1f7f337096ef28b60026fd8c',
      '1738b2c8c1b2a7a0e5bd09dfea8e232dec8b626224ceb62dd4e54d485b71957d'),
     (8,
      '2397a04861b9ee87057ed023a2a5f10ec4ed1c14184f22cbf53606783398e1fa',
      '8edd06b686969ca768a6d7ee77bad780ceb0217c3a61ab18e65ab0f840d438b'),
     (9,
      '500fd35e1fb72c4d0b5d1060734964b0e338f273ee41567cae51158ce98cfde1',
      'd6cb4f591a28d27d7a041be13cf00408d7e2f0d989e6a32f88d0d9259d1bab2a')]

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
