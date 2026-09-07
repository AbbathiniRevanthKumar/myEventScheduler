"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.CustomError = exports.InvalidTransitionError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode = 500;
    name = "App error";
    errors = [];
    constructor(message, statusCode, name, errors = []) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        this.name = name;
        this.errors = errors;
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404, "NotFoundError");
    }
}
exports.NotFoundError = NotFoundError;
class InvalidTransitionError extends AppError {
    constructor(message) {
        super(message, 409, "InvalidTransitionError");
    }
}
exports.InvalidTransitionError = InvalidTransitionError;
class CustomError extends AppError {
    constructor(message, statusCode, name) {
        super(message, statusCode, name);
    }
}
exports.CustomError = CustomError;
class ValidationError extends AppError {
    constructor(error) {
        super(error.message, 400, "ValidationError", error.issues);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map