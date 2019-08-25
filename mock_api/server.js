const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const morgan = require('morgan');
const authenicator = require('./helpers/authenticator');

const app = express();

if (process.env.NODE_ENV === 'production') {
    console.log('DO NOT USE THIS IN PRODUCTION');
    console.log('THIS IS A MOCK API');
    console.log('THIS IS NOT SECURE');
    throw new Error('Some idiot is trying to use the mock API in production!');
}

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests
app.use(morgan('tiny'));

// Use our authenticator to secure the API
app.use(authenicator);

// API routes
app.use(router);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Mock API Server is running on port ${port}`);
});