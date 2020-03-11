# build
npm run build

# navigate into the build output directory
cd dist


# NEED TO BE AT
## C:\Users\Devon\source\repos\dseacrest.github.io\shared-checklists\dist>
# CHANGE DEPLOY #
git init
git add -A
git commit -m 'deploy 29'
git push -f https://github.com/dseacrest/dseacrest.github.io.git master

# navigate to root directory 
cd.. cd..

# NEED TO BE AT 
# C:\Users\Devon\source\repos\dseacrest.github.io>
# CHANGE DEPLOY #
git init
git add -A
git commit -m 'deploy 29'
git push -f https://github.com/dseacrest/dseacrest.github.io.git develop


# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME