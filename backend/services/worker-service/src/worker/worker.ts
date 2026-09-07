import { Job, Worker } from "bullmq";
import { jobQueueName } from "@myeventscheduler/shared";
import { redisConnection } from "@myeventscheduler/shared";
import logger from "../config/logger";
import { handler } from "../handlers";
import { jobQueue } from "@myeventscheduler/shared";
import { schedulerClient } from "../clients/schedulerClient";

const jobProcessor = async (bullJob: Job) => {
  const { jobId } = bullJob.data;
  try {
    const job = await schedulerClient.getJob(jobId);
    if (!job) {
      logger.error("Job not found", jobId);
      return;
    }

    const startedJob = await schedulerClient.startJob(jobId);
    if (!startedJob) {
      logger.error("Job not found", { startedJob });
      return;
    }
    const jobHandler = handler[startedJob.type];
    if (!jobHandler) {
      logger.error("No handler for job type ", { JobType: startedJob.type });
      throw new Error("No handler found");
    }
    await jobHandler(startedJob.payload);
    await schedulerClient.completeJob(jobId);
  } catch (error: any) {
    logger.error("Error at processing job ..",{error : error.message});
    try {
      const failedJob = await schedulerClient.failJob(jobId, {
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
    } catch (reportingError) {
      logger.error(
        "Could not report job failure to scheduler-service - job may be stuck",
        { jobId, reportingError },
      );
    }
  }
};

export const worker = new Worker(
  jobQueueName,
  async (bullJob: any) => {
    await jobProcessor(bullJob);
  },
  {
    connection: redisConnection,
  },
);
