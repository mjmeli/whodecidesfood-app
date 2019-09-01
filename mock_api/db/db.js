// "Database" library
//      This abstracts the data access for the application.
//      Current backend is just a JSON file, obviously this wouldn't be ideal in a production environment.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const models = require('../models');

const dataPath = path.join(__dirname, 'db.json');

/* General */

const getNextId = (arr) => arr.length ? Math.max.apply(Math, (arr.map(a => a.id))) + 1 : 0;

const createAuthToken = () => {
    // This doesn't have to be secure
    return crypto.randomBytes(32).toString('hex');
};

const checkDbExists = () => {
    if (!fs.existsSync(dataPath)) {
        throw new Error('DB does not exist. Did you generate it with createMockDb.js?');
    }
};

const getData = () => {
    checkDbExists();
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, (err, data) => err ? reject(err) : resolve(JSON.parse(data)));
    });
};

const saveData = (data) => {
    checkDbExists();
    return new Promise((resolve, reject) => {
        fs.writeFile(dataPath, JSON.stringify(data), err => err ? reject(err) : resolve());
    });
};

const validateComparisonExistsAndAuthorized = (userId, comparisonId, data) => {
    const user = data.users.find(u => u.id === userId);
    if (!user) {
        return [ false, null ];
    } else {
        const isAuthorized = !!user.comparison_ids.find(cid => cid === comparisonId);
        const comparison = data.comparisons.find(c => c.id === comparisonId && c.user_id === userId);
        const doesComparisonExist = !!comparison;
        return [ isAuthorized && doesComparisonExist, comparison ];
    }
};

const validateParticipantExists = (comparison, participantId) => {
    const participant = comparison.participants.find(p => p.id === participantId);
    return [ !!participant, participant ];
};

const filterKeys = (obj, allowedKeys) => {
    // Remove any invalid keys from an object
    return Object.keys(obj)
        .filter(key => allowedKeys.includes(key))
        .reduce((retObj, key) => {
            retObj[key] = obj[key];
            return retObj;
        }, {});
};

/* Users */

const getUsers = () => {
    return new Promise(resolve => {
        getData()
            .then(data => resolve(data.users));
    });
};

const saveUser = (userId, user, authToken = null) => {
    return new Promise(resolve => {
        getData()
            .then(data => {
                user = filterKeys(user, [ 'email', 'password' ]);

                let newUser;
                if (userId) {
                    // Update
                    const currentIndex = data.users.findIndex(c => c.id === userId);
                    const currentUser = data.users[currentIndex];
                    newUser = {
                        ...currentUser,
                        ...user,
                        auth_token: authToken || currentUser.auth_token
                    };
                    data.users[currentIndex] = newUser;
                } else {
                    // Create
                    const id = getNextId(data.users);
                    newUser = {
                        ...models.user(),
                        ...user,
                        id,
                        auth_token: authToken || createAuthToken()
                    };
                    data.users.push(newUser);
                }

                saveData(data)
                    .then(() => resolve(newUser));
            });
    });
};

/* Sessions */

const createSession = (userId, user) => {
    return saveUser(userId, user, createAuthToken());
};

const deleteSession = (userId, user) => {
    return saveUser(userId, user, null);
};

/* Comparisons */

const getComparisons = (userId) => {
    return new Promise(resolve => {
        getData()
            .then(data => resolve(data.comparisons.filter(c => c.user_id === userId)));
    });
};

const getComparison = (userId, comparisonId) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                return resolve(comparison);
            });
    });
};

const saveComparison = (userId, comparisonId, comparisonUpdate) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                comparisonUpdate = filterKeys(comparisonUpdate, [ 'title' ]);

                let newComparison;
                if (comparisonId) {
                    const [ isComparisonValid, currentComparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                    if (!isComparisonValid) {
                        return reject(new Error('Comparison not found for this user'));
                    }

                    // Update - find via index to update in place
                    const currentIndex = data.comparisons.findIndex(c => c === currentComparison);
                    newComparison = {
                        ...currentComparison,
                        ...comparisonUpdate
                    };
                    data.comparisons[currentIndex] = newComparison;
                } else {
                    // Create
                    const id = getNextId(data.comparisons);
                    newComparison = {
                        ...models.comparison(),
                        ...comparisonUpdate,
                        id,
                        user_id: userId
                    };
                    data.comparisons.push(newComparison);
                    data.users.find(u => u.id === userId).comparison_ids.push(id);
                }

                saveData(data)
                    .then(() => resolve(newComparison));
            });
    });
};

const deleteComparison = (userId, comparisonId) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                data.comparisons = data.comparisons.filter(c => c !== comparison);

                saveData(data)
                    .then(() => resolve(comparisonId));
            });
    });
};

/* Participants */

const getParticipants = (userId, comparisonId) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                return resolve(comparison.participants);
            });
    });
};

const getParticipant = (userId, comparisonId, participantId) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                const [ doesParticipantExist, participant ] = validateParticipantExists(comparison, participantId);
                if (!doesParticipantExist) {
                    return reject(new Error('Participant not found for this comparison'));
                }

                return resolve(participant);
            });
    });
};

const saveParticipant = (userId, comparisonId, participantId, participantUpdate) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                participantUpdate = filterKeys(participantUpdate, [ 'name' ]);

                let newParticipant;
                if (participantId) {
                    const [ doesParticipantExist, currentParticipant ] = validateParticipantExists(comparison, participantId);
                    if (!doesParticipantExist) {
                        return reject(new Error('Participant not found for this comparison'));
                    }

                    // Update - use index to be able to update in place
                    const currentIndex = comparison.participants.findIndex(p => p === currentParticipant);
                    newParticipant = {
                        ...currentParticipant,
                        ...participantUpdate
                    };
                    comparison.participants[currentIndex] = newParticipant;
                } else {
                    // Create
                    const id = getNextId(comparison.participants);
                    newParticipant = {
                        ...models.participant(),
                        ...participantUpdate,
                        id,
                        score: 0,
                        comparison_id: comparisonId
                    };
                    comparison.participants.push(newParticipant);
                }

                saveData(data)
                    .then(() => resolve(newParticipant));
            });
    });
};

const deleteParticipant = (userId, comparisonId, participantId) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                const [ doesParticipantExist, participant ] = validateParticipantExists(comparison, participantId);
                if (!doesParticipantExist) {
                    return reject(new Error('Participant not found for this comparison'));
                }

                comparison.participants = comparison.participants.filter(p => p !== participant);

                saveData(data)
                    .then(() => resolve(participantId));
            });
    });
};

/* Decisions */

const createDecision = (userId, comparisonId, decision) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                const [ isComparisonValid, comparison ] = validateComparisonExistsAndAuthorized(userId, comparisonId, data);
                if (!isComparisonValid) {
                    return reject(new Error('Comparison not found for this user'));
                }

                const [ doesParticipantExist, participant ] = validateParticipantExists(comparison, decision.participant_id);
                if (!doesParticipantExist) {
                    return reject(new Error('Participant not found for this comparison'));
                }

                decision = filterKeys(decision, [ 'meal', 'location' ]);

                // Create
                const id = getNextId(comparison.decisions);
                const newDecision = {
                    ...models.decision(),
                    ...decision,
                    id,
                    comparison_id: comparisonId,
                    participant_id: participant.id
                };
                comparison.decisions.push(newDecision);
                participant.score += 1; // increment score

                saveData(data)
                    .then(() => resolve(newDecision));
            });
    });
};

module.exports = {
    getUsers,
    saveUser,
    createSession,
    deleteSession,
    getComparisons,
    getComparison,
    saveComparison,
    deleteComparison,
    getParticipants,
    getParticipant,
    saveParticipant,
    deleteParticipant,
    createDecision
};
