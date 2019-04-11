#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then echo "Not a master build, not deploying"; exit 0; fi

# deploy build/splitgraph
# decrypt our key
openssl aes-256-cbc -K $encrypted_57ed443d832d_key -iv $encrypted_57ed443d832d_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa
mv travis_rsa ~/.ssh/id_rsa

# get us to trust splitgraph.com
echo "[splitgraph.com]:9092 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEApm3oOAWtA+EUcWykQwAoX+B+5q+hAK1jHPOAsmdttEZxBe/yjzfn31ot2cp+SS8TRy4PZxMeFlfqx/OdIeLuwbPm6iOi+6LlgTTkaxLbvgv6ugLEXLfMgQ5KBOPZ3w7SGw6K4yO7s15zNri5NLx0juZELoA4jyVrq/A25l9GDW6WiBe8LLrdn/Lf6jOBhJKI8M8krgCdrnRiVKNmAgSo7iibFBoefum6wm8hwzoKTaot8SFB1iVhblgdcLrDwziE8zuwtjSjy9Bf+IVsLag6+ShByXbh5tWrRDpN3IYDyjzUgJtIkKTGP2uSuBrdRXMgyy7NyavKtAwSNLgXJlxfPQ==" >> $HOME/.ssh/known_hosts
bash ./.ci/remote_deploy.sh
