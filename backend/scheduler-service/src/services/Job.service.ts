import { Job, JobCreationAttributes, JobError } from "../models/Job";
import { jobRepository } from "../repositories/job.repository";
import { InvalidTransitionError, NotFoundError } from "../utils/error";
import { JobStatus } from "../utils/types";

const VALID_TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  PENDING: ["RUNNING"],
  RUNNING: ["COMPLETED", "FAILED"],
  FAILED: ["PENDING", "DEAD_LETTER"],
  DEAD_LETTER: ["PENDING"],
  COMPLETED: [],
};

class JobService {
  canTransition(from: JobStatus, to: JobStatus): boolean {
    //return if the transition is valid or not
    return VALID_TRANSITIONS[from].includes(to);
  }

  private async getJobOrThrow(id: string, nextStatus: JobStatus): Promise<Job> {
    const job = await jobRepository.getJobById(id);
    if (!job) {
      throw new NotFoundError(`Job with id = ${id} not found`);
    }
    if (!this.canTransition(job.status, nextStatus)) {
      throw new InvalidTransitionError(
        `Invalid transition from ${job.status} to ${nextStatus}`,
      );
    }

    return job;
  }

  async startJob(id: string): Promise<Job | null> {
    //status from pending -> running
    //attempts++
    const job = await this.getJobOrThrow(id, "RUNNING");
    const updatedJob = await jobRepository.updateJob(id, {
      status: "RUNNING",
      attempts: job.attempts + 1,
    });

    return updatedJob;
  }

  async completeJob(id: string): Promise<Job | null> {
    //status to completed
    const job = await this.getJobOrThrow(id, "COMPLETED");
    const updatedJob = await jobRepository.updateJob(id, {
      status: "COMPLETED",
      completedAt: new Date(),
    });

    return updatedJob;
  }

  async failJob(id: string, error: JobError): Promise<Job | null> {
    //get the job by Id
    //status to fail
    //if attempts < maxAttempts ? pending : dead_letter
    //add error
    const job = await this.getJobOrThrow(id, "FAILED");
    await jobRepository.updateJob(id, {
      status: "FAILED",
      error: error,
    });
    if (job.attempts < job.maxAttempts) {
      if (!this.canTransition("FAILED", "PENDING")) {
        throw new InvalidTransitionError(
          `Invalid transition from FAILED state to PENDING state`,
        );
      }
      return await jobRepository.updateJob(id, {
        status: "PENDING",
        error: null,
      });
    }
    if (!this.canTransition("FAILED", "DEAD_LETTER")) {
      throw new InvalidTransitionError(
        `Invalid transition from FAILED state to DEAD_LETTER state` ,
      );
    }
    return await jobRepository.updateJob(id, {
      status: "DEAD_LETTER",
    });
  }

  async retryJob(id: string): Promise<Job | null> {
    //status === DEAD_LETTER
    //attempts to 0
    //status -> pending
    const job = await this.getJobOrThrow(id, "PENDING");
    return await jobRepository.updateJob(id, {
      status: "PENDING",
      attempts: 0,
      error: null,
    });
  }

  async createJob(data: JobCreationAttributes) {
    const job = await jobRepository.createJob(data);
    return job;
  }

  async listJobs(filters: any): Promise<Job[] | []> {
    const jobs = await jobRepository.listJobs(filters);
    return jobs;
  }

  async jobById(id: string): Promise<Job | null> {
    const job = await jobRepository.getJobById(id);
    return job;
  }

  async deleteJob(id: string): Promise<boolean> {
    return await jobRepository.deleteJob(id);
  }
}

export const jobService = new JobService();
