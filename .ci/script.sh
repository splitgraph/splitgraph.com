#!/bin/bash

# Build docs from Splitgraph's master branch
git clone https://github.com/splitgraph/splitgraph.git && cd splitgraph
curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python

. $HOME/.poetry/env
poetry install -E ingestion
cd docs && poetry run make clean html

# Build commandline docs
cd .. && poetry run python ../website/generate_markdown_commandline_reference.py docs/sgr -f

# Build static site
cd ../website && yarn install && yarn build

# Inject API docs into the site
cp ../splitgraph/docs/_build/html -r build/splitgraph/sphinx