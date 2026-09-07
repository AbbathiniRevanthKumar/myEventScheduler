"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
const bullmq_1 = require("bullmq");
const shared_1 = require("@myeventscheduler/shared");
const shared_2 = require("@myeventscheduler/shared");
const logger_1 = __importDefault(require("../config/logger"));
const handlers_1 = require("../handlers");
const shared_3 = require("@myeventscheduler/shared");
const schedulerClient_1 = require("../clients/schedulerClient");
const jobProcessor = async (bullJob) => {
    const { jobId } = bullJob.data;
    try {
        const job = await schedulerClient_1.schedulerClient.getJob(jobId);
        if (!job) {
            logger_1.default.error("Job not found", jobId);
            return;
        }
        const startedJob = await schedulerClient_1.schedulerClient.startJob(jobId);
        if (!startedJob) {
            logger_1.default.error("Job not found", { startedJob });
            return;
        }
        const jobHandler = handlers_1.handler[startedJob.type];
        if (!jobHandler) {
            logger_1.default.error("No handler for job type ", { JobType: startedJob.type });
            throw new Error("No handler found");
        }
        await jobHandler(startedJob.payload);
        await schedulerClient_1.schedulerClient.completeJob(jobId);
    }
    catch (error) {
        logger_1.default.error("Error at processing job ..", { error: error.message });
        try {
            const failedJob = await schedulerClient_1.schedulerClient.failJob(jobId, {
                message: error.message,
            });
            if (failedJob?.status === "PENDING") {
                // recalculate delay the same way createJob does, though for a retry it's likely immediate (no runAt)
                const delay = 10000;
                await shared_3.jobQueue.add(failedJob.type, { jobId: failedJob.id }, { delay: delay });
            }
        }
        catch (reportingError) {
            logger_1.default.error("Could not report job failure to scheduler-service - job may be stuck", { jobId, reportingError });
        }
    }
};
exports.worker = new bullmq_1.Worker(shared_1.jobQueueName, async (bullJob) => {
    await jobProcessor(bullJob);
}, {
    connection: shared_2.redisConnection,
});
//# sourceMappingURL=worker.js.map