class CodedError extends Error {
    constructor (message = 'Unknow', code = -1) {
        super(message)
        this.code = code
    }
}

module.exports = {
    CodedError,

    UnauthorizedError: class UnauthorizedError extends CodedError {
        constructor (message = 'Unauthorized'){
            super(message, 401)
        }
    },
    InvalidQueryError: class InvalidQueryError extends CodedError {
        constructor (message = 'Bad Request') {
            super(message, 400)
        }
    },
    ForbiddenError: class ForbiddenError extends CodedError {
        constructor (message = 'No Necessary Permissions') {
            super(message, 403)
        }
    },
    AccessDBError: class AccessDBError extends CodedError {
        constructor (message = 'DB Error') {
            super(message, 500)
        }
    },
    FileSystemError: class FileSystemError extends CodedError {
        constructor (message = 'FS Error') {
            super(message, 500)
        }
    }
}