const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

class SessionsController {
    create (req, res) {
        const credentials = req.body.session ? req.body.session : req.body;

        if (!credentials.email || !credentials.password) {
            return createErrors(400, 'email and password are required', res);
        }

        db.getUsers()
            .then(users => {
                const user = users.find(c => c.email === credentials.email);
                if (!user || user.password !== credentials.password) {
                    return createErrors(401, 'Invalid username/password combination', res);
                } else {
                    db.createSession(user.id, user)
                        .then(user => createSuccess({ auth_token: user.auth_token }, res))
                        .catch(err => createErrors(500, err, res));
                }
            })
            .catch(err => createErrors(500, err, res));
    }

    delete (req, res) {
        db.getUsers()
            .then(users => {
                const user = users.find(c => c.auth_token === req.params.authToken);
                if (!user) {
                    return createErrors(400, 'No session found with that authentication token', res);
                } else {
                    db.deleteSession(user.id, user)
                        .then(user => createSuccess({ auth_token: user.auth_token }, res))
                        .catch(err => createErrors(500, err, res));
                }
            });
    }
}

const sessionsController = new SessionsController();

module.exports = sessionsController;
