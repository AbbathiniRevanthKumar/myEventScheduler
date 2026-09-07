"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobErrorSchema = exports.jobIdSchema = exports.listJobsSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    type: zod_1.z.enum([
        "send_email",
        "generate_report",
        "webhook_call",
        "trigger_api",
    ]),
    payload: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    runAt: zod_1.z.coerce.date().optional(),
    maxAttempts: zod_1.z.number().optional().default(3),
});
exports.listJobsSchema = zod_1.z.object({
    limit: zod_1.z.coerce.number().int().positive().optional(),
    offset: zod_1.z.coerce.number().int().nonnegative().optional(),
    status: zod_1.z
        .enum(["PENDING", "COMPLETED", "RUNNING", "FAILED", "DEAD_LETTER"])
        .optional(),
});
exports.jobIdSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
});
exports.jobErrorSchema = zod_1.z.object({
    error: zod_1.z.object({
        message: zod_1.z.string(),
        code: zod_1.z.string().optional(),
        stack: zod_1.z.any().optional(),
    }),
});
//# sourceMappingURL=job.js.map