const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

const getIds = (req) => {
    const userId = parseInt(req.user.id);
    const comparisonId = parseInt(req.params.comparisonId);
    const participantId = parseInt(req.params.participantId);
    return [ userId, comparisonId, participantId ];
};

class ParticipantsController {
    getAll (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        db.getParticipants(userId, comparisonId)
            .then(participants => createSuccess(participants, res))
            .catch(err => createErrors(404, err, res));
    }

    get (req, res) {
        const [ userId, comparisonId, participantId ] = getIds(req);

        db.getParticipant(userId, comparisonId, participantId)
            .then(participant => createSuccess(participant, res))
            .catch(err => createErrors(404, err, res));
    }

    save (req, res) {
        const [ userId, comparisonId, participantId ] = getIds(req);

        const participant = req.body.participant ? req.body.participant : req.body;
        if (!participant.name) {
            return createErrors(400, 'name is required', res);
        }

        db.saveParticipant(userId, comparisonId, participantId, participant)
            .then(participant => createSuccess(participant, res))
            .catch(err => createErrors(404, err, res));
    }

    delete (req, res) {
        const [ userId, comparisonId, participantId ] = getIds(req);

        db.deleteParticipant(userId, comparisonId, participantId)
            .then(deletedId => createSuccess({ id: deletedId }, res))
            .catch(err => createErrors(404, err, res));
    }
}

const participantsController = new ParticipantsController();

module.exports = participantsController;
