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

const validateComparisonAuthorization = (userId, comparisonId, data) => {
    const user = data.users.find(u => u.id === userId);
    if (!user) {
        return false;
    } else {
        return user.comparison_ids.find(cid => cid === comparisonId);
    }
};

/* Users */

const getUsers = () => {
    return new Promise(resolve => {
        getData()
            .then(data => resolve(data.users));
    });
};

const saveUser = (userId, user) => {
    return new Promise(resolve => {
        getData()
            .then(data => {
                let newUser;

                if (userId) {
                    // Update
                    const currentIndex = data.users.findIndex(c => c.id === userId);
                    newUser = {
                        ...data.users[currentIndex],
                        ...user
                    };
                    data.users[currentIndex] = newUser;
                } else {
                    // Create
                    const id = getNextId(data.users);
                    newUser = {
                        ...models.user(),
                        ...user,
                        id,
                        auth_token: createAuthToken()
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
    user.auth_token = createAuthToken();
    return saveUser(userId, user);
};

const deleteSession = (userId, user) => {
    user.auth_token = null;
    return saveUser(userId, user);
};

/* Comparisons */

const getComparisons = (userId) => {
    return new Promise(resolve => {
        getData()
            .then(data => resolve(data.comparisons.filter(c => c.user_id === userId)));
    });
};

const saveComparison = (userId, comparisonId, comparison) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                let newComparison;

                if (comparisonId) {
                    if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                        reject('Comparison not found for this user');
                    }

                    // Update
                    const currentIndex = data.comparisons.findIndex(c => c.user_id === userId && c.id === comparisonId);
                    newComparison = {
                        ...data.comparisons[currentIndex],
                        ...comparison
                    };
                    data.comparisons[currentIndex] = newComparison;
                } else {
                    // Create
                    const id = getNextId(data.comparisons);
                    newComparison = {
                        ...models.comparison(),
                        ...comparison,
                        id,
                        user_id: userId
                    };
                    data.comparisons.push(newComparison);
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
                if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                    reject('Comparison not found for this user');
                }

                const after = data.comparisons.filter(c => c.user_id !== userId || c.id !== comparisonId);
                if (data.comparisons.length === after.length) {
                    reject('No comparison with specified ID found');
                }

                data.comparisons = after;
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
                if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                    reject('Comparison not found for this user');
                }

                resolve(data.participants.filter(p => p.comparison_id === comparisonId));
            });
    });
};

const saveParticipant = (userId, comparisonId, participantId, participant) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                    reject('Comparison not found for this user');
                }

                let newParticipant;
                if (participantId) {
                    // Update
                    const currentIndex = data.participants.findIndex(p => p.id === participantId);
                    newParticipant = {
                        ...data.participants[currentIndex],
                        ...participant
                    };
                    data.participants[currentIndex] = newParticipant;
                } else {
                    // Create
                    const id = getNextId(data.participants);
                    newParticipant = {
                        ...models.participant(),
                        ...participant,
                        id,
                        score: 0,
                        comparison_id: comparisonId
                    };
                    data.participants.push(newParticipant);

                    // Update foreign key relationships
                    const comparison = data.comparisons.find(c => c.id === comparisonId);
                    comparison.participant_ids.push(id);
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
                if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                    reject('Comparison not found for this user');
                }

                const after = data.participants.filter(p => p.comparision_id !== comparisonId || p.id !== participantId);
                if (data.participants.length === after.length) {
                    reject('No participant with specified IDs found');
                }
                data.participants = after;

                // Update foreign key relationships
                const comparison = data.comparisons.find(c => c.id === comparisonId);
                comparison.participant_ids = comparison.participant_ids.filter(pid => pid !== participantId);

                saveData(data)
                    .then(() => resolve(participantId));
            });
    });
};

/* Decisions */

const createDecision = (userId, comparisonId, participantId, decision) => {
    return new Promise((resolve, reject) => {
        getData()
            .then(data => {
                if (!validateComparisonAuthorization(userId, comparisonId, data)) {
                    reject('Comparison not found for this user');
                }

                // Create
                const id = getNextId(data.decisions);
                const newDecision = {
                    ...models.decision(),
                    ...decision,
                    id,
                    comparison_id: comparisonId,
                    partipant_id: participantId
                };
                data.decisions.push(newDecision);

                // Update foreign key relationships
                const comparison = data.comparisons.find(c => c.id === comparisonId);
                comparison.decision_ids.push(id);
                const participant = data.participants.find(p => p.id === participantId);
                participant.decision_ids.push(id);

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
    saveComparison,
    deleteComparison,
    getParticipants,
    saveParticipant,
    deleteParticipant,
    createDecision
};
