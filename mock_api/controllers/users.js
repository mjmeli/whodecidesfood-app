const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

class UsersController {
    getAll (req, res) {
        db.getUsers()
            .then(users => createSuccess(users, res))
            .catch(err => createErrors(500, err, res));
    }

    create (req, res) {
        if (!req.body.email || !req.body.password || !req.body.password_confirmation) {
            return createErrors(400, 'email, password, and password_confirmation are required', res);
        }

        if (req.body.password !== req.body.password_confirmation) {
            return createErrors(400, 'Password and password confirmation do not match', res);
        }

        db.getUsers()
            .then(users => {
                // Email must be unique
                if (users.find(u => u.email === req.body.email)) {
                    return createErrors(400, 'An account with this email already exists', res);
                } else {
                    db.saveUser(null, req.body)
                        .then(user => createSuccess(user, res))
                        .catch(err => createErrors(500, err, res));
                }
            });
    }
}

const usersController = new UsersController();

module.exports = usersController;
