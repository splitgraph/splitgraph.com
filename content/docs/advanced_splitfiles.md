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

    $ sgr provenance example/output:latest
    
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

    $ sgr provenance example/output:latest --full
    
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

    $ sgr rebuild example/output:latest --against example/repo_2:new_data
    
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

    $ sgr sql --schema example/output "SELECT * FROM result ORDER BY key"
    
    [(2,
      'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
      'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35_UPDATED'),
     (3,
      '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
      '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce_UPDATED'),
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

Since the first two rows are now missing from `example/repo_2`, the JOIN
result doesn't have them either.

The caching behaviour still holds here, so if we do a `rebuild` against
the original version of `example/repo_1`, the first version of
`example/output` will be checked out:

    $ sgr rebuild example/output:latest --against example/repo_2:original_data
    
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
