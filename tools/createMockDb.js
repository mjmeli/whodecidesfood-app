// createMockDb
//      Uses faker.js to generate a bunch of mock data for use by our API.
//      This mimics the structure of the actual backend datastore, but we omit irrelevant properties.

/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const faker = require("faker");

const getNextId = (arr) => arr.length ? Math.max.apply(Math, (arr.map(a => a.id))) + 1 : 0;

const doNTimes = (n, f) => Array(n).fill().map(() => f());

const create = (data, userEmailOverride = null, userPasswordOverride = null) => {
    const user = createUser(data.users);
    if (userEmailOverride)
        user.email = userEmailOverride;
    if (userPasswordOverride)
        user.password = userPasswordOverride;

    doNTimes(3, () => {
        const comparison = createComparison(data.comparisons, user.id);
        user.comparisonIds.push(comparison.id);

        doNTimes(2, () => {
            const participant = createParticipant(data.participants, comparison.id);
            comparison.participantIds.push(participant.id);

            doNTimes(5, () => {
                const decision = createDecision(data.decisions, comparison.id, participant.id);
                comparison.decisionIds.push(decision.id);
                participant.decisionIds.push(decision.id);
            });
        });
    });
}

const createUser = (users) => {
    const id = getNextId(users);
    const user = {
        id,
        email: faker.internet.email(),
        password: faker.internet.password(),
        auth_token: null,
        comparisonIds : []
    };

    users.push(user);
    return user;
};

const createComparison = (comparisons, userId) => {
    const id = getNextId(comparisons);
    const comparison = {
        id,
        title: faker.commerce.productName(),
        userId,
        decisionIds: [],
        participantIds: []
    };

    comparisons.push(comparison);
    return comparison;
};

const createParticipant = (participants, comparisonId) => {
    const id = getNextId(participants);
    const participant = {
        id,
        name: faker.name.findName(),
        score: faker.random.number(100),
        comparisonId,
        decisionIds: []
    };

    participants.push(participant);
    return participant;
};

const createDecision = (decisions, comparisonId, participantId) => {
    const id = getNextId(decisions);
    const decision = {
        id,
        meal: faker.random.arrayElement(["Breakfast", "Lunch", "Dinner", "Snack"]),
        location: faker.company.companyName(),
        participantId,
        comparisonId
    };

    decisions.push(decision);
    return decision;
}

// Our database
const data = {
    users: [],
    comparisons: [],
    participants: [],
    decisions: []
};

// Random users to fill out the DB
doNTimes(5, () => create(data));

// Our known test user
create(data, "test@test.com", "test");

// Write to file
const dataJson = JSON.stringify(data);
const filepath = path.join(__dirname, "db.json");
fs.writeFile(filepath, dataJson, function(err) {
    err ? console.log(err) : console.log("Mock DB created.");
});