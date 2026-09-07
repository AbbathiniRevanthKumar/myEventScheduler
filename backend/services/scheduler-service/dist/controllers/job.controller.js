"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobController = void 0;
const helper_1 = require("../utils/helper");
const error_1 = require("../utils/error");
const Job_service_1 = require("../services/Job.service");
const response_1 = require("../utils/response");
class JobController {
    createJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const jobDetails = req.validated.body;
        if (!jobDetails) {
            throw new error_1.CustomError("Provide job details", 400, "Invalid input");
        }
        const job = await Job_service_1.jobService.createJob(jobDetails);
        return response_1.ResponseHandler.success(res, job, "Job created", 201);
    });
    listJobs = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { status, limit, offset } = req.validated.query;
        const jobs = await Job_service_1.jobService.listJobs({
            status: status,
            limit: limit,
            offset: offset,
        });
        return response_1.ResponseHandler.success(res, jobs, "jobs", 200);
    });
    jobById = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.validated.params;
        if (!id) {
            throw new error_1.CustomError("Provide job id", 400, "InvalidInputError");
        }
        const job = await Job_service_1.jobService.jobById(id);
        return response_1.ResponseHandler.success(res, job, "Requested job", 200);
    });
    deleteJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.validated.params;
        const isJobDeleted = await Job_service_1.jobService.deleteJob(id);
        if (!isJobDeleted)
            throw new error_1.CustomError("Fail to delete job", 500, "JobDeletionError");
        return response_1.ResponseHandler.success(res, isJobDeleted, "Job deleted", 200);
    });
    startJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.params;
        const job = await Job_service_1.jobService.startJob(id);
        return response_1.ResponseHandler.success(res, job, "job started", 200);
    });
    failJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.validated.params;
        const { error } = req.validated.body;
        const job = await Job_service_1.jobService.failJob(id, error);
        return response_1.ResponseHandler.success(res, job, "job failed", 200);
    });
    completeJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.validated.params;
        const job = await Job_service_1.jobService.completeJob(id);
        return response_1.ResponseHandler.success(res, job, "job completed", 200);
    });
    retryJob = (0, helper_1.asyncHandler)(async (req, res, next) => {
        const { id } = req.validated.params;
        const job = await Job_service_1.jobService.retryJob(id);
        return response_1.ResponseHandler.success(res, job, "Retried job", 200);
    });
}
exports.jobController = new JobController();
//# sourceMappingURL=job.controller.js.map