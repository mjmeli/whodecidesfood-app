# whodecidesfood-app
[![Build Status](https://travis-ci.org/mjmeli/whodecidesfood-app.svg?branch=master)](https://travis-ci.org/mjmeli/whodecidesfood-app)

Vue.js-based frontend for WhoDecidesFood, a web application that allows users to track who decides food as a competition. This front-end is designed to be integrated and deployed with the Ruby on Rails based REST API backend.

See the [whodecidesfood-app](https://github.com/mjmeli/whodecidesfood-app) repo for the backend.

## Team
* Michael Meli
* Kylie Geller

## Local Environment Setup
The only requirement is `node`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080, with mock API at localhost:3001
npm start

# build for production with minification
npm run build
```

## Deployment
To deploy, first you will want to build a minified production distribution with `npm run build`. This will generate files in the `dist` folder. Copy these files to the `public` folder of the Rails backend. Rails comes with Puma by default as a web server that can serve these files.

Contained within this repo is a file `heroku-deploy.sh`. This script is an example of how this website can be deployed along with the API using Heroku as an example (Heroku is used as our production platform).
