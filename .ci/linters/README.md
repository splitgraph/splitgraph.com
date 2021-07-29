# Lints

To add a linter, create an executable script in this directory, and the runner
`.ci/lint.sh` will execute the script.

The script should `exit 1` to indicate **linting failure**. In this case, the
runner will print all of the script's stdout and stderr to stdout.

The script should `exit 0` to indicate **linting success**. In this case, the
runner will suppress all stdout and stderr from the script.

It is recommended that linters follow a standard format: first, print the explanation
of the rule to stdout. Then print the filename and line number of every linting
violation.
