"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const jobEvents_1 = require("./jobEvents");
const redisPublisher_1 = require("./redisPublisher");
logger_1.default.info("Registering Events");
jobEvents_1.jobEvents.on("statusChanged", async (payload) => {
    try {
        const data = {
            type: "JOB_STATUS_CHANGE",
            payload: payload,
        };
        await redisPublisher_1.redisPublisher.publish("job-status-channel", JSON.stringify(data));
    }
    catch (error) {
        logger_1.default.error("Failed to publish job status", error);
    }
});
jobEvents_1.jobEvents.on("jobCreated", async (payload) => {
    try {
        const data = {
            type: "JOB_CREATED",
            payload: payload,
        };
        await redisPublisher_1.redisPublisher.publish("job-create-channel", JSON.stringify(data));
    }
    catch (error) {
        logger_1.default.error("Failed to publish new job", error);
    }
});
//# sourceMappingURL=eventPublisher.js.map