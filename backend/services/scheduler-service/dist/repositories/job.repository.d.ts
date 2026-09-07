import { Job, JobAttributes, JobCreationAttributes } from "../models/Job";
import { JobStatus } from "@myeventscheduler/shared";
declare class JobRepository {
    createJob(data: JobCreationAttributes): Promise<Job>;
    getJobById(id: string): Promise<Job | null>;
    listJobs(filters: {
        status?: JobStatus;
        limit?: number;
        offset?: number;
    }): Promise<Job[]>;
    deleteJob(id: string): Promise<boolean>;
    updateJob(id: string, changes: Partial<JobAttributes>): Promise<Job | null>;
}
export declare const jobRepository: JobRepository;
export {};
