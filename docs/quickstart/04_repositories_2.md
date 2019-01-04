
Repository manipulation
-----------------------

A checked out repository also has change tracking enabled, so any
alterations to that schema by any application will be captured, allowing
Splitgraph to package them into new images. In particular, changes to
preexisting tables will be stored as `DIFF` objects (delta compressed)
so that keeping track of table history is space efficient.

Let's create another example repository and give the new image a tag:

    sgr example generate example/repo_2
    sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"
    sgr tag example/repo_2 original_data

The next step can be done from any application that can access the
PostgreSQL database backing the Splitgraph engine, but `sgr` provides a
shorthand to alter the generated image:

    sgr example alter example/repo_2
    Deleting 2 rows...
    Updating 2 rows...
    Adding 2 rows...

Let's inspect the current state of the repository:

    sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

You should see that the first two rows are now missing, the second two
rows have been altered and two more rows have been added.

Since the checked out repository has change tracking enabled, we can see
the exact changes that have been performed to the `demo` table without
having to actually compare it to its previous version:

    sgr diff example/repo_2 --verbose
    Between 6881def87f34 and the current working copy:
    demo: added 2 rows, removed 2 rows, updated 2 rows.
    (0,): - None
    (1,): - None
    (2,): U {'c': ['value'], 'v': ['cd36823ad91bf9f972efd98bbfcc30369e1c76ff993cc8ce79c5585535ad6d75']}
    (3,): U {'c': ['value'], 'v': ['77414cb9c351690c63bab539e8170562f4140d18f35d39c9cf3750285cccc4a3']}
    (10,): + {'c': ['value'], 'v': ['a6a43b6c7d4a6c801e3a56a15fafac15e0da62bf489e9e94f3edf24793df2798']}
    (11,): + {'c': ['value'], 'v': ['10a3906410fffe957b8bf577a1eb4f9d60e9b8668dda320235b469ef2de7ac34']}

Let's commit the changes to the new repository to create a new image:

    sgr commit example/repo_2 --message "My first image"
    sgr show --verbose example/repo_2:latest
    Image example/repo_2:a0057ef93849ce853b3c2a7268814cabdb6ba733cfd1f3b23a19ea719e11a98d
    My first image
    Created at 2019-01-01T14:23:33.641988
    Parent: 6881def87f34aa1d7501d2960719fd6b5df9c392053278eade089b3186ee8407

    Tables:
      demo: obd90d0188367a0d9c1b06dff92a729a97d360d50c9fc94438b1b70d71842a5 (DIFF)

You'll see that the `demo` table is stored as a `DIFF` object in this
image: only the 6 changed rows have been stored in it, as opposed to the
whole table.

Tag the new image and check out the old one:

    sgr tag example/repo_2 new_data
    sgr checkout example/repo_2:original_data
    sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

You should see the original contents of the table before all changes.
Check out the new copy:

    sgr checkout example/repo_2:new_data
    sgr sql --schema example/repo_2 "SELECT * FROM demo ORDER BY key"

Behind the scenes, this replays the changes packaged up in the `DIFF`
object against the original copy of the table.
