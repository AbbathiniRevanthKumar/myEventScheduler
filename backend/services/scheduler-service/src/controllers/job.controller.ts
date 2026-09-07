import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/helper";
import { CustomError } from "../utils/error";
import { jobService } from "../services/Job.service";
import { ResponseHandler } from "../utils/response";
import { JobStatus } from "@myeventscheduler/shared";

class JobController {
  createJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const jobDetails = req.validated.body;
      if (!jobDetails) {
        throw new CustomError("Provide job details", 400, "Invalid input");
      }

      const job = await jobService.createJob(jobDetails);

      return ResponseHandler.success(res, job, "Job created", 201);
    },
  );

  listJobs = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { status, limit, offset } = req.validated.query;
      const jobs = await jobService.listJobs({
        status: status as JobStatus,
        limit: limit,
        offset: offset,
      });
      return ResponseHandler.success(res, jobs, "jobs", 200);
    },
  );

  jobById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.validated.params;
      if (!id) {
        throw new CustomError("Provide job id", 400, "InvalidInputError");
      }
      const job = await jobService.jobById(id as string);
      return ResponseHandler.success(res, job, "Requested job", 200);
    },
  );

  deleteJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.validated.params;
      const isJobDeleted = await jobService.deleteJob(id as string);
      if (!isJobDeleted)
        throw new CustomError("Fail to delete job", 500, "JobDeletionError");
      return ResponseHandler.success(res, isJobDeleted, "Job deleted", 200);
    },
  );

  startJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const job = await jobService.startJob(id as string);
      return ResponseHandler.success(res, job, "job started", 200);
    },
  );

  failJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.validated.params;
      const { error } = req.validated.body;
      const job = await jobService.failJob(id as string, error);
      return ResponseHandler.success(res, job, "job failed", 200);
    },
  );

  completeJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.validated.params;
      const job = await jobService.completeJob(id as string);
      return ResponseHandler.success(res, job, "job completed", 200);
    },
  );

  retryJob = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.validated.params;
      const job = await jobService.retryJob(id as string);
      return ResponseHandler.success(res, job, "Retried job", 200);
    },
  );
}

export const jobController = new JobController();
