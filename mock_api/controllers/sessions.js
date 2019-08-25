const db = require('../db/db');

class SessionsController {
    create (req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json('Email and password are required');
        }

        db.getUsers()
            .then(users => {
                const user = users.find(c => c.email === req.body.email);
                if (!user || user.password !== req.body.password) {
                    res.status(401).json('Invalid username/password combination');
                } else {
                    db.createSession(user.id, user)
                        .then(user => res.status(200).json({ auth_token: user.auth_token }));
                }
            });
    }

    delete (req, res) {
        db.getUsers()
            .then(users => {
                const user = users.find(c => c.auth_token === req.params.authToken);
                if (!user) {
                    res.status(400).json('No session found with that authentication token');
                } else {
                    db.deleteSession(user.id, user)
                        .then(user => res.status(200).json({ auth_token: user.auth_token }));
                }
            });
    }
}

const sessionsController = new SessionsController();

module.exports = sessionsController;
