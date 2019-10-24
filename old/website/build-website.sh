#!/bin/bash

# Should be run from the script's current working directory

# Run the code example tests
# python test_doc_commandline.py --before "sgr rm -y example/repo_1; sgr rm -y example/repo_2; sgr rm -y example/output; sgr cleanup" --dir ../docs installation.md  repositories.md  splitfiles.md  advanced_splitfiles.md
# This requires the engine to be running on localhost:5432 which currently doesn't happen on the CI machine

# Generate Markdown docs in ../docs/sgr for the command line client
python generate_markdown_commandline_reference.py ../docs/sgr -f

# Build the website itself
yarn build

# Rebuild the API docs and swap them in (assuming the splitgraph and splitgraph.com repos are in the same folder)
cd ../../splitgraph/docs && make clean html
cp _build/html -r ../../splitgraph.com/website/build/splitgraph/sphinx
