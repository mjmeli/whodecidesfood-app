const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

// Users
router.get('/api/users', controllers.UsersController.getAll);
router.post('/api/users', controllers.UsersController.create);

// Sessions
router.post('/api/sessions', controllers.SessionsController.create);
router.delete('/api/sessions/:authToken', controllers.SessionsController.delete);

// Comparisons
router.get('/api/comparisons', controllers.ComparisonsController.getAll);
router.get('/api/comparisons/:comparisonId', controllers.ComparisonsController.get);
router.post('/api/comparisons', controllers.ComparisonsController.save);
router.patch('/api/comparisons/:comparisonId', controllers.ComparisonsController.save);
router.delete('/api/comparisons/:comparisonId', controllers.ComparisonsController.delete);

// Participants
router.get('/api/comparisons/:comparisonId/participants', controllers.ParticipantsController.getAll);
router.get('/api/comparisons/:comparisonId/participants/:participantId', controllers.ParticipantsController.get);
router.post('/api/comparisons/:comparisonId/participants', controllers.ParticipantsController.save);
router.patch('/api/comparisons/:comparisonId/participants/:participantId', controllers.ParticipantsController.save);
router.delete('/api/comparisons/:comparisonId/participants/:participantId', controllers.ParticipantsController.delete);

// Decisions
router.post('/api/comparisons/:comparisonId/decisions', controllers.DecisionsController.create);

module.exports = router;
