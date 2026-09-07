"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const error_1 = require("../utils/error");
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof error_1.AppError) {
        return response_1.ResponseHandler.error(res, err.message, err.statusCode, err.errors);
    }
    // Unexpected error — log the real details server-side, but don't leak internals to the client
    logger_1.default.error("Error : ", err); // or your real logger
    return response_1.ResponseHandler.error(res, "Internal server error", 500, env_1.envConstants.APP_ENV === "development" ? err : []);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map