// Global error handler

const createSuccess = (successObj, res) => {
    return res.status(200).json(successObj);
};

const createErrors = (errorCode, error, res) => {
    let errorMsg = '';
    if (error instanceof Error) {
        errorMsg = error.message;
        // console.log(error.stack);
    } else {
        errorMsg = error.toString();
    }

    if (!errorMsg) {
        errorMsg = 'Unknown error occurred.';
    }

    return res.status(errorCode).json({ 'errors': [ errorMsg ] });
};

const defaultErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.log(err);
    createErrors(500, 'Oops! Internal error :(', res);
};

module.exports = {
    createSuccess,
    createErrors,
    defaultErrorHandler
};
