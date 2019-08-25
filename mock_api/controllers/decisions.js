const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

const getIds = (req) => {
    const userId = parseInt(req.user.id);
    const comparisonId = parseInt(req.params.comparisonId);
    const participantId = parseInt(req.body.participant_id);
    return [ userId, comparisonId, participantId ];
};

class DecisionsController {
    create (req, res) {
        const [ userId, comparisonId, participantId ] = getIds(req);

        if (!req.body.meal || !req.body.location) {
            return createErrors(400, 'Meal and location are required', res);
        }

        db.createDecision(userId, comparisonId, participantId, req.body)
            .then(decision => createSuccess(decision, res))
            .catch(err => createErrors(404, err, res));
    }
}

const decisionsController = new DecisionsController();

module.exports = decisionsController;
