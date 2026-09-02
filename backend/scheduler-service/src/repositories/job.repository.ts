import { Job, JobAttributes, JobCreationAttributes } from "../models/Job";
import { JobStatus } from "../utils/types";

class JobRepository {
  async createJob(data: JobCreationAttributes): Promise<Job> {
    return Job.create(data, { returning: true });
  }

  async getJobById(id: string): Promise<Job | null> {
    return Job.findByPk(id);
  }

  async listJobs(filters: {
    status?: JobStatus;
    limit?: number;
    offset?: number;
  }): Promise<Job[]> {
    return Job.findAll({
      where: {
        ...(filters.status && { status: filters.status }),
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
      limit: filters.limit ?? 50,
      offset: filters.offset ?? 0,
    });
  }

  async deleteJob(id: string): Promise<boolean> {
    const [affectedRows] = await Job.update(
      { isActive: false },
      {
        where: {
          id: id,
        },
      },
    );
    return affectedRows > 0;
  }

  async updateJob(
    id: string,
    changes: Partial<JobAttributes>,
  ): Promise<Job | null> {
    const [affectedCount, affectedRows] = await Job.update(changes, {
      where: { id: id },
      returning: true,
    });
    return affectedRows[0] ?? null;
  }
}

export const jobRepository = new JobRepository();
