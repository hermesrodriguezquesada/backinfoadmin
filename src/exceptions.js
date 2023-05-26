const ErrorCode = Object.freeze({
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    OPERATION_ERROR: 'OPERATION_ERROR',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    UNHANDLED_ERROR: 'SERVER_ERROR',
    NOT_FOUND: 'NOT_FOUND',
});

const ErrorMessage = Object.freeze({
    UNHANDLED_ERROR: 'Something broke!',
    NOT_ALLOWED: 'You are not allowed to perform this action',
    NOT_FOUND: 'Resource not found',
    INVALID_CODE: 'Invalid code',
    INVALID_PARAMETER: 'Invalid Parameter',
    INVALID_PARAM: (param) => `Invalid param [${param}]`
});

/**
 * error_400
 */
class ValidationError extends Error {
    constructor(
        message,
        code = ErrorCode.VALIDATION_ERROR,
        additionalInfo = {},
    ) {
        super(message);
        this.name = 'ValidationError';
        this.code = code;
        this.additionalInfo = additionalInfo;
    }
}

/**
 * error_500
 */
class OperationError extends Error {
    constructor(message, code = ErrorCode.OPERATION_ERROR) {
        super(message);
        this.name = 'OperationError';
        this.code = code;
    }
}

/**
 * error_401
 */
class ForbiddenError extends Error {
    constructor(message, code = ErrorCode.FORBIDDEN_ERROR) {
        super(message);
        this.name = 'ForbiddenError';
        this.code = code;
    }
}

/**
 * error_404
 */
class NotFoundError extends Error {
    constructor(message, code = ErrorCode.NOT_FOUND) {
        super(message);
        this.name = 'NotFoundError';
        this.code = code;
    }
}

module.exports = {
    ErrorCode,
    ErrorMessage,
    ValidationError,
    OperationError,
    ForbiddenError,
    NotFoundError,
};
