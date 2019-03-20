import os
import subprocess

import click


@click.command(name='main')
@click.option("-b", "--before", multiple=True, help="Commands to run before the test")
@click.option("-w", "--dir", help="Directory where the files are located")
@click.option("-d", "--dry-run", is_flag=True, default=False,
              help="If true, outputs the contents but doesn't run the tests")
@click.argument("file", nargs=-1)
def main(before, dir, dry_run, file):
    """
    Runs sanity checks on documentation to make sure that the example command line invocations work. Each file is
    scanned for a line "    $ sgr" and the commands are executed in the order that they appear.
    """

    print("Scanning %d file(s) for tests..." % len(file))

    tests = {}
    for fname in file:
        print(" * " + fname + "...")
        with open(os.path.join(dir, fname), 'r') as fobj:
            commands = [line[6:].strip() for line in fobj.readlines() if line.startswith("    $ sgr")]
            tests[fname] = commands
    total = sum(len(v) for v in tests.values())
    print("Discovered %d test(s)" % total)

    if dry_run:
        print("# Test setup:")
        print("\n".join(before))
        for fname in file:
            if tests[fname]:
                print("# %s" % fname)
                print("\n".join(tests[fname]))
        return

    print("Setting up the tests...")
    for cmd in before:
        print(cmd)
        subprocess.run(cmd, shell=True, stderr=subprocess.DEVNULL, check=True)
    print("Running tests...")
    index = 1
    for fname in file:
        for cmd in tests[fname]:
            print("(%d/%d) %s %s..." % (index, total, fname, cmd), end='')
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            if result.returncode == 0:
                print(" PASSED")
            else:
                print(" FAILED")
                print("---------- stdout ----------")
                print(result.stdout.decode('utf-8'))
                print("---------- stderr ----------")
                print(result.stderr.decode('utf-8'))
                exit(1)
            index += 1
    print("All tests passed.")


main()
