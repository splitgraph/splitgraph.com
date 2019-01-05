---
id: advanced_splitfiles
title: Advanced Splitfile usage
---

There's one other advantage to using Splitfiles instead of building
images manually: provenance tracking. An image that is created by a
Splitfile has the specifics of the actual command that created it stored
in its metadata.

This means that we can output a list of images and repositories that
were used in an image's creation:

    sgr provenance example/output:latest
    example/output:96833d33a4333d33fd2490ca2ec8ebab83be5481cb17372b9a66e1518253a111 depends on:
    example/repo_2:6881def87f34aa1d7501d2960719fd6b5df9c392053278eade089b3186ee8407
    example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d06a643d0b50ce5f74f35ad1e3c7

Since the Splitfile in the previous section imported tables from the two
generated repositories, these repositories are considered to be
`example/output`'s dependencies (note that the `example/output`
repository can still be checked out and used without those two
repositories present).

However, that's not all. We can also reconstruct a Splitfile that can be
used to rebuild the newly created image, without the original Splitfile
present:

    sgr provenance example/output:latest --full
    # Splitfile commands used to recreate example/output:96833d33a4333d33fd2490ca2ec8ebab83be5481cb17372b9a66e1518253a111
    FROM example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d06a643d0b50ce5f74f35ad1e3c7 IMPORT demo AS table_1
    FROM example/repo_2:6881def87f34aa1d7501d2960719fd6b5df9c392053278eade089b3186ee8407 IMPORT demo AS table_2
    SQL CREATE TABLE result AS SELECT table_1.key, table_1.value AS value_1, table_2.value AS value_2 FROM table_1 JOIN table_2 ON table_1.key = table_2.key

Unlike Dockerfiles and building filesystem images, in this case
everything that is needed to rebuild a certain image (links to source
images and the actual commands) is encoded in the provenance
information. In particular, this means that we can rebuild the
`example/output:latest` image against a different version of any of its
dependencies by simply substituting a different image hash into this
regenerated Splitfile:

    sgr rebuild example/output:latest --against example/repo_2:new_data
    Rerunning example/output:96833d33a4333d33fd2490ca2ec8ebab83be5481cb17372b9a66e1518253a111 against:
    example/repo_2:new_data

    Step 1/3 : FROM example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d...
    Resolving repository example/repo_1
     ---> Using cache
     ---> 73c258b9a244

    Step 2/3 : FROM example/repo_2:new_data IMPORT demo AS table_2
    Resolving repository example/repo_2
    Importing tables ('demo',):a0057ef93849 from example/repo_2 into example/output
    2019-01-01 15:07:49,632 INFO Applying obd90d0188367a0d9c1b06dff92a729a97d360d50c9fc94438b1b70d71842a5...
     ---> bc8791660f6d

    Step 3/3 : SQL CREATE TABLE result AS SELECT table_1.key, table_1.va...
    Executing SQL...
    2019-01-01 15:07:49,695 INFO Committing example/output...
     ---> a2c37225c2d1

Since the same image from `example/repo_1` is used here, the first step
in the execution results in the same image hash and so the image is
simply checked out. However, since the image from `example/repo_2` is
now the altered one that we created in the previous section, the rest of
the derivation has to be rerun.

Let's examine the new result:

    sgr sql --schema example/output "SELECT * FROM result ORDER BY key"
    [(2,
      '1d8cdaef663c05d4792c692bfe3344d77935bd6d04ccf23f508dec2ae4f156fb',
      'cd36823ad91bf9f972efd98bbfcc30369e1c76ff993cc8ce79c5585535ad6d75'),
     (3,
      'c720af85b57634711987d4cc21bdecb7c68f8e76f7a39f3d9c5ffb500528f3e6',
      '77414cb9c351690c63bab539e8170562f4140d18f35d39c9cf3750285cccc4a3'),
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

Since the first two rows are now missing from `example/repo_2`, the JOIN
result doesn't have them either.

The caching behaviour still holds here, so if we do a `rebuild` against
the original version of `example/repo_1`, the first version of
`example/output` will be checked out:

    sgr rebuild example/output:latest --against example/repo_2:original_data
    Rerunning example/output:a2c37225c2d162c0d78bc15195a740e3a231bb9c1b5f37c00d3bf04560c63216 against:
    example/repo_2:original_data

    Step 1/3 : FROM example/repo_1:5fe74f282e33fb78dda67b3c96f9f915e949d...
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
