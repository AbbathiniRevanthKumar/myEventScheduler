"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const error_1 = require("../utils/error");
const validateSchema = (schema, type) => {
    return (req, res, next) => {
        const input = req[type];
        const result = schema.safeParse(input);
        req.validated ??= {};
        if (result.success) {
            req.validated[type] = result.data;
            return next();
        }
        return next(new error_1.ValidationError(result.error));
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map