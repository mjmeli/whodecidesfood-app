// Global error handler

const createSuccess = (successObj, res) => {
    return res.status(200).json(successObj);
};

const createErrors = (errorCode, error, res) => {
    return res.status(errorCode).json({ 'errors': [ error ] });
};

module.exports = {
    createSuccess,
    createErrors
};
