"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const jobEvents_1 = require("../events/jobEvents");
const shared_1 = require("@myeventscheduler/shared");
const job_repository_1 = require("../repositories/job.repository");
const error_1 = require("../utils/error");
const VALID_TRANSITIONS = {
    PENDING: ["RUNNING"],
    RUNNING: ["COMPLETED", "FAILED"],
    FAILED: ["PENDING", "DEAD_LETTER"],
    DEAD_LETTER: ["PENDING"],
    COMPLETED: [],
};
class JobService {
    canTransition(from, to) {
        //return if the transition is valid or not
        return VALID_TRANSITIONS[from].includes(to);
    }
    async getJobOrThrow(id, nextStatus) {
        const job = await job_repository_1.jobRepository.getJobById(id);
        if (!job) {
            throw new error_1.NotFoundError(`Job with id = ${id} not found`);
        }
        if (!this.canTransition(job.status, nextStatus)) {
            throw new error_1.InvalidTransitionError(`Invalid transition from ${job.status} to ${nextStatus}`);
        }
        return job;
    }
    notifyStatusChange(previousStatus, updatedJob) {
        logger_1.default.info(`Job status change`, {
            jobId: updatedJob.id,
            status: updatedJob.status,
            previousStatus: previousStatus,
        });
        jobEvents_1.jobEvents.emit("statusChanged", {
            jobId: updatedJob.id,
            status: updatedJob.status,
            previousStatus: previousStatus,
            timestamp: new Date(),
        });
        return;
    }
    notifyJobCreated(job) {
        logger_1.default.info(`Job created`, {
            jobId: job.id,
        });
        jobEvents_1.jobEvents.emit("jobCreated", job);
        return;
    }
    async startJob(id) {
        //status from pending -> running
        //attempts++
        const job = await this.getJobOrThrow(id, "RUNNING");
        const updatedJob = await job_repository_1.jobRepository.updateJob(id, {
            status: "RUNNING",
            attempts: job.attempts + 1,
        });
        if (!updatedJob) {
            throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
        }
        this.notifyStatusChange(job.status, updatedJob);
        return updatedJob;
    }
    async completeJob(id) {
        //status to completed
        const job = await this.getJobOrThrow(id, "COMPLETED");
        const updatedJob = await job_repository_1.jobRepository.updateJob(id, {
            status: "COMPLETED",
            completedAt: new Date(),
        });
        if (!updatedJob) {
            throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
        }
        this.notifyStatusChange(job.status, updatedJob);
        return updatedJob;
    }
    async failJob(id, error) {
        //get the job by Id
        //status to fail
        //if attempts < maxAttempts ? pending : dead_letter
        //add error
        const job = await this.getJobOrThrow(id, "FAILED");
        let failedJob = await job_repository_1.jobRepository.updateJob(id, {
            status: "FAILED",
            error: error,
        });
        if (!failedJob) {
            throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
        }
        this.notifyStatusChange(job.status, failedJob);
        if (job.attempts < job.maxAttempts) {
            if (!this.canTransition("FAILED", "PENDING")) {
                throw new error_1.InvalidTransitionError(`Invalid transition from FAILED state to PENDING state`);
            }
            const updatedJob = await job_repository_1.jobRepository.updateJob(id, {
                status: "PENDING",
                error: null,
            });
            if (!updatedJob) {
                throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
            }
            this.notifyStatusChange(failedJob.status, updatedJob);
            return updatedJob;
        }
        if (!this.canTransition("FAILED", "DEAD_LETTER")) {
            throw new error_1.InvalidTransitionError(`Invalid transition from FAILED state to DEAD_LETTER state`);
        }
        const updatedJob = await job_repository_1.jobRepository.updateJob(id, {
            status: "DEAD_LETTER",
        });
        if (!updatedJob) {
            throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
        }
        this.notifyStatusChange(failedJob.status, updatedJob);
        return updatedJob;
    }
    async retryJob(id) {
        //status === DEAD_LETTER
        //attempts to 0
        //status -> pending
        const job = await this.getJobOrThrow(id, "PENDING");
        const updatedJob = await job_repository_1.jobRepository.updateJob(id, {
            status: "PENDING",
            attempts: 0,
            error: null,
        });
        if (!updatedJob) {
            throw new error_1.CustomError("Failed to update Job", 500, "JobUpdateError");
        }
        this.notifyStatusChange(job.status, updatedJob);
        return updatedJob;
    }
    async createJob(data) {
        const job = await job_repository_1.jobRepository.createJob(data);
        try {
            await shared_1.jobQueue.add(job.type, { jobId: job.id }, {
                delay: Math.max(0, (job.runAt?.getTime() ?? Date.now()) - Date.now()),
            });
            this.notifyJobCreated(job);
        }
        catch (error) {
            logger_1.default.error("Error at queuing the job", error);
            logger_1.default.info("Delete the job", job.id);
            await job_repository_1.jobRepository.deleteJob(job.id);
            throw new error_1.CustomError("Error at job creation or queuing", 500, "JobCreationError");
        }
        return job;
    }
    async listJobs(filters) {
        const jobs = await job_repository_1.jobRepository.listJobs(filters);
        return jobs;
    }
    async jobById(id) {
        const job = await job_repository_1.jobRepository.getJobById(id);
        return job;
    }
    async deleteJob(id) {
        return await job_repository_1.jobRepository.deleteJob(id);
    }
}
exports.jobService = new JobService();
//# sourceMappingURL=Job.service.js.map