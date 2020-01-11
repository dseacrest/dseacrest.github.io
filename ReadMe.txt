cd v#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# Need to do all these steps
git init
git add -A
git commit -m 'deploy'

# force push to git

git push -f https://github.com/dseacrest/dseacrest.github.io.git master