const {
    ValidationError,
    OperationError,
    ForbiddenError,
    NotFoundError,
    ErrorCode,
    ErrorMessage,
} = require('../exceptions');

const Logger = require('../libs/logger');
const {responseTypes, standardResponse} = require('../utils/globalUtils');

const errorHandler = (err, req, res, next) => {
    const logger = Logger(`middleware.errorHandler | ${req.url}`);

    if (err instanceof ValidationError) {
        logger.debug('Validation error', err);
        const data = {
            error: {
                code: err.code,
                message: err.message,
            },
        };
        return standardResponse(responseTypes._400_BADREQUEST, "", data, res);
    }

    if (err instanceof OperationError) {
        logger.error('Operation error', err);
        const data = {
            error: {
                code: err.code,
                message: err.message,
            },
        };
        return standardResponse(responseTypes._500_OPERATION_ERROR, "", data, res);
    }

    if (err instanceof ForbiddenError) {
        logger.warn('Forbidden error', err);
        const data = {
            error: {
                code: err.code,
                message: err.message,
            },
        };
        return standardResponse(responseTypes._403_FORBIDDEN, "", data, res);
    }

    if (err instanceof NotFoundError || err.status === 404) {
        logger.warn('Not found error');
        const data = {
            error: {
                code: err.code,
                message: err.message,
            },
        };
        return standardResponse(responseTypes._404_NOTFOUND, "", data, res);
    }

    logger.error('Unhandled error', err);
    const data = {
        error: {
            code: err.code,
            message: err.message,
        },
    };
    standardResponse(responseTypes._500_OPERATION_ERROR, "", data, res);
};

module.exports = errorHandler;
