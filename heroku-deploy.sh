#!/bin/bash

#
# heroku-deploy.sh
#
# This script can be used to deploy the front-end to the rails backend on Heroku
# This makes various assumptions:
#     1) the backend repo is reachable from this repo (see path variable below)
#     2) the backend repo is deployable to Heroku and configured as such
#
# Please run this script from the root of the front-end directory (same
# level as this script).
#     ./heroku-deploy.sh

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

# TODO: Modify this to point to the whodecidesfood-api directory
API_PATH="../whodecidesfood-api"

# Build a production dist of the app
npm run build

# Copy the production dist to the public folder of the backend
API_PUBLIC_PATH="$API_PATH/public"
cp -r dist/* $API_PUBLIC_PATH

# Deploy to Heroku
# Note that we don't want to commit the production dist to the actual git repo,
# so we avoid this by switching to a new branch, committing, and then force
# pushing to Heroku. This will overwrite Heroku git history!
cd $API_PATH
git checkout -b heroku-deploy
git add public
git commit -m "deploy"
git push -f heroku heroku-deploy:master
heroku run rake db:migrate  # in case we made backend changes

# Cleanup our git changes
git checkout master
git branch -D heroku-deploy

# Return to where we were before
cd $SCRIPT_DIR
