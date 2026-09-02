import { Job, Worker } from "bullmq";
import { jobQueueName } from "../utils/types";
import { redisConnection } from "../queue/connection";
import { jobService } from "../services/Job.service";
import logger from "../config/logger";
import { handler } from "../handlers";
import { NotFoundError } from "../utils/error";
import { jobQueue } from "../queue/jobQueue";
import "../events/eventPublisher";

const jobProcessor = async (bullJob: Job) => {
  const { jobId } = bullJob.data;
  const job = await jobService.jobById(jobId);
  try {
    if (!job) {
      logger.error("Job not found", jobId);
      return;
    }

    const startedJob = await jobService.startJob(jobId);
    if (!startedJob) {
      throw new NotFoundError("Job not found");
    }
    const jobHandler = handler[startedJob.type];
    if (!jobHandler) {
      logger.error("No handler for job type ", startedJob.type);
      throw new Error("No handler found");
    }
    await jobHandler(startedJob.payload);
    await jobService.completeJob(jobId);
  } catch (error: any) {
    logger.error(error.message, error);
    const failedJob = await jobService.failJob(jobId, {
      message: error.message,
    });
    if (failedJob?.status === "PENDING") {
      // recalculate delay the same way createJob does, though for a retry it's likely immediate (no runAt)
      const delay = 10000;
      await jobQueue.add(
        failedJob.type,
        { jobId: failedJob.id },
        { delay: delay },
      );
    }
  }
};

export const worker = new Worker(
  jobQueueName,
  async (bullJob) => {
    await jobProcessor(bullJob);
  },
  {
    connection: redisConnection,
  },
);


