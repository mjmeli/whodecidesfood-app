const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

const getIds = (req) => {
    const userId = parseInt(req.user.id);
    const comparisonId = parseInt(req.params.comparisonId);
    return [ userId, comparisonId ];
};

class DecisionsController {
    create (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        const decision = req.body.decision ? req.body.decision : req.body;
        if (!decision.meal || !decision.location) {
            return createErrors(400, 'meal and location are required', res);
        }
        if (!decision.participant_id && decision.participant_id !== 0) {
            return createErrors(400, 'participant_id is required', res);
        } else {
            decision.participant_id = parseInt(decision.participant_id);
        }

        if (!['Breakfast', 'Lunch', 'Dinner', 'Snack'].find(m => m === decision.meal)) {
            return createErrors(400, 'Invalid meal type', res);
        }

        db.createDecision(userId, comparisonId, decision)
            .then(decision => createSuccess(decision, res))
            .catch(err => createErrors(404, err, res));
    }
}

const decisionsController = new DecisionsController();

module.exports = decisionsController;
