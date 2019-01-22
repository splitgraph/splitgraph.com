#!/bin/bash
set -xe

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# some wild security by obscurity going on here
rsync -ahIe 'ssh -p 9092' -r build/splitgraph/ travis@splitgraph.com:/var/www/sg/   # add --delete to remove everything existing
