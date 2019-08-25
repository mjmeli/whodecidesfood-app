const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

const getIds = (req) => {
    const userId = parseInt(req.user.id);
    const comparisonId = parseInt(req.params.comparisonId);
    return [ userId, comparisonId ];
};

class ComparisonsController {
    getAll (req, res) {
        const [ userId ] = getIds(req);

        db.getComparisons(userId)
            .then(comparisons => createSuccess(comparisons, res))
            .catch(err => createErrors(404, err, res));
    }

    get (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        db.getComparisons(userId)
            .then(comparisons => {
                const comparison = comparisons.find(c => c.id === comparisonId);
                createSuccess(comparison, res);
            })
            .catch(err => createErrors(404, err, res));
    }

    save (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        if (!req.body.title) {
            return res.createErrors(400, 'Title is required', res);
        }

        db.saveComparison(userId, comparisonId, req.body)
            .then(comparison => createSuccess(comparison, res))
            .catch(err => createErrors(404, err, res));
    }

    delete (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        db.deleteComparison(userId, comparisonId)
            .then(deletedId => createSuccess({ id: deletedId }, res))
            .catch(err => createErrors(404, err, res));
    }
}

const comparisonsController = new ComparisonsController();

module.exports = comparisonsController;
