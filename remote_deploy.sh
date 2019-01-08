#!/bin/bash
set -xe

# if [ $TRAVIS_BRANCH == 'master' ] ; then   --- commented out, testing deploys on everything
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# some wild security by obscurity going on here
rsync -avhIe 'ssh -p 9092' -r build/splitgraph/ travis@splitgraph.com:/var/www/sg/   # add --delete to remove everything existing

# else
#   echo "Not deploying, since this branch isn't master."
# fi