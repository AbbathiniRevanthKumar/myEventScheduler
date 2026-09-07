"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerClient = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const BASE_URL = env_1.envConstants.SCHEDULER_SERVICE_BASE_URL;
class SchedulerClient {
    async getJob(id) {
        try {
            const response = await axios_1.default.get(`${BASE_URL}/scheduler-service/api/v1/jobs/${id}`);
            return response.data.data ?? null;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to fetch job: ${error.response?.status ?? "network error"}`);
            }
            throw error;
        }
    }
    async startJob(id) {
        try {
            const response = await axios_1.default.post(`${BASE_URL}/scheduler-service/api/v1/jobs/${id}/start`);
            return response.data.data ?? null;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to start job: ${error.response?.status ?? "network error"}`);
            }
            throw error;
        }
    }
    async failJob(id, message) {
        try {
            const response = await axios_1.default.post(`${BASE_URL}/scheduler-service/api/v1/jobs/${id}/fail`, { error: message });
            return response.data.data ?? null;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to fail job: ${error.response?.status ?? "network error"}`);
            }
            throw error;
        }
    }
    async completeJob(id) {
        try {
            const response = await axios_1.default.post(`${BASE_URL}/scheduler-service/api/v1/jobs/${id}/complete`);
            return response.data.data ?? null;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Failed to complete job: ${error.response?.status ?? "network error"}`);
            }
            throw error;
        }
    }
}
exports.schedulerClient = new SchedulerClient();
//# sourceMappingURL=schedulerClient.js.map