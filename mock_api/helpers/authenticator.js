const db = require('../db/db');
const { createErrors } = require('../helpers/resultHandlers');

const authenticator = async (req, res, next) => {
    // Login/logout path and signup paths are public
    if (req.path.includes('/api/sessions') || (req.path.includes('/api/users')) && req.method === 'POST') {
        return next();
    }

    // All users paths besides the signup path are only for development
    if (req.path.includes('/api/users')) {
        if (process.env.NODE_ENV !== 'development') {
            return createErrors(401, 'Admin access only', res);
        } else {
            return next();
        }
    }

    // Check for authentication token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return createErrors(401, 'Missing authentication token', res);
    }

    // Find who we are authenticating
    const users = await db.getUsers();
    const user = users.find(u => u.auth_token === authToken);
    if (!user) {
        return createErrors(401, 'Invalid authentication token', res);
    } else {
        // Inject the current user onto the request to be used later in the pipeline
        req.user = user;
        return next();
    }
};

module.exports = authenticator;
