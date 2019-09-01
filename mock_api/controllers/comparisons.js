const db = require('../db/db');
const { createSuccess, createErrors } = require('../helpers/resultHandlers');

const getIds = (req) => {
    const userId = parseInt(req.user.id);
    const comparisonId = parseInt(req.params.comparisonId);
    return [ userId, comparisonId ];
};

const mapDecisionsToIds = (comparison) => {
    // Switch decisions to their ids instead of the full decision as this list will grow long
    const { decisions, ...comparisonFiltered } = comparison;
    comparisonFiltered.decision_ids = decisions.map(d => d.id);
    return comparisonFiltered;
};

class ComparisonsController {
    getAll (req, res) {
        const [ userId ] = getIds(req);

        db.getComparisons(userId)
            .then(comparisons => {
                // Switch decisions to their ids instead of the full decision as this list will grow long
                comparisons = comparisons.map(c => mapDecisionsToIds(c));
                return createSuccess(comparisons, res);
            })
            .catch(err => createErrors(404, err, res));
    }

    get (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        db.getComparison(userId, comparisonId)
            .then(comparison => {
                // Switch decisions to their ids instead of the full decision as this list will grow long
                comparison = mapDecisionsToIds(comparison);
                return createSuccess(comparison, res);
            })
            .catch(err => createErrors(404, err, res));
    }

    save (req, res) {
        const [ userId, comparisonId ] = getIds(req);

        const comparison = req.body.comparison ? req.body.comparison : req.body;
        if (!comparison.title) {
            return createErrors(400, 'title is required', res);
        }

        db.saveComparison(userId, comparisonId, comparison)
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
