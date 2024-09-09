const { ValidationError } = require('joi');
const CustomErrorHandler = require('../services/customerErrorHandler');

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: "An unexpected error occurred",
    };
    
    if (err instanceof ValidationError) {
        statusCode = 422;
        data.message = err.message;
    } else if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data.message = err.message;
    } else if (err instanceof Error) {
        data.message = err.message;
    }

    res.status(statusCode).json(data);
};

module.exports = errorHandler;
