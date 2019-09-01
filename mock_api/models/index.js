// models
//      This defines our types for the backend API

const hackyDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const user = {
    id: null,
    email: null,
    password: null,
    auth_token: null,
    comparison_ids: []
};

const comparison = {
    id: null,
    title: null,
    user_id: null,
    participants: [],
    decisions: []
};

const participant = {
    id: null,
    name: null,
    score: 0,
    comparison_id: null
};

const decision = {
    id: null,
    meal: null,
    location: null,
    participant_id: null,
    comparison_id: null
};

module.exports = {
    user: () => hackyDeepCopy(user),
    comparison: () => hackyDeepCopy(comparison),
    participant: () => hackyDeepCopy(participant),
    decision: () => hackyDeepCopy(decision)
};
