#!/bin/bash

# Should be run from the script's current working directory

# Generate Markdown docs in ../docs/sgr for the command line client
python generate_markdown_commandline_reference.py ../docs/sgr -f

# Build the website itself
yarn build

# Rebuild the API docs and swap them in (assuming the splitgraph and splitgraph.com repos are in the same folder)
cd ../../splitgraph/docs && make clean html
cp _build/html -r ../../splitgraph.com/website/build/splitgraph/sphinx
