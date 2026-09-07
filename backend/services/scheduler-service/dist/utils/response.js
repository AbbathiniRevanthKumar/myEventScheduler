"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static success(res, data = [], message = "Success", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            data,
            message,
            errors: [],
        });
    }
    static error(res, message = "Internal Server Error", statusCode = 500, errors = []) {
        return res.status(statusCode).json({
            success: false,
            data: null,
            message,
            errors,
        });
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.js.map