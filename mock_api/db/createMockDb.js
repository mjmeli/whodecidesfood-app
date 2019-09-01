// createMockDb
//      Uses faker.js to generate a bunch of mock data for use by our API.
//      This mimics the structure of the actual backend datastore, but we omit irrelevant properties.

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const models = require('../models');

const getNextId = (arr) => arr.length ? Math.max.apply(Math, (arr.map(a => a.id))) + 1 : 0;

const doNTimes = (n, f) => Array(n).fill().map(() => f());

const create = (data, userEmailOverride = null, userPasswordOverride = null) => {
    const user = createUser(data.users);
    if (userEmailOverride) {
        user.email = userEmailOverride;
    }
    if (userPasswordOverride) {
        user.password = userPasswordOverride;
    }

    doNTimes(3, () => {
        const comparison = createComparison(data.comparisons, user.id);
        user.comparison_ids.push(comparison.id);

        doNTimes(2, () => {
            const participant = createParticipant(comparison);

            doNTimes(5, () => {
                createDecision(comparison, participant);
            });
        });
    });
};

const createUser = (users) => {
    const id = getNextId(users);
    const user = {
        ...models.user(),
        id,
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    users.push(user);
    return user;
};

const createComparison = (comparisons, userId) => {
    const id = getNextId(comparisons);
    const comparison = {
        ...models.comparison(),
        id,
        title: faker.commerce.productName(),
        user_id: userId
    };

    comparisons.push(comparison);
    return comparison;
};

const createParticipant = (comparison) => {
    const id = getNextId(comparison.participants);
    const participant = {
        ...models.participant(),
        id,
        name: faker.name.findName(),
        score: faker.random.number(100),
        comparison_id: comparison.id
    };

    comparison.participants.push(participant);
    return participant;
};

const createDecision = (comparison, participant) => {
    const id = getNextId(comparison.decisions);
    const decision = {
        ...models.decision(),
        id,
        meal: faker.random.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
        location: faker.company.companyName(),
        participant_id: participant.id,
        comparison_id: comparison.id
    };

    comparison.decisions.push(decision);
    return decision;
};

// Our database
const data = {
    users: [],
    comparisons: []
};

// Random users to fill out the DB
doNTimes(5, () => create(data));

// Our known test user
create(data, 'test@test.com', 'test');

// Write to file
const dataJson = JSON.stringify(data);
const filepath = path.join(__dirname, 'db.json');
fs.writeFile(filepath, dataJson, err => err ? console.log(err) : console.log('Mock DB created.'));
