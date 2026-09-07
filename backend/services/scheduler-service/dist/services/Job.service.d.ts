import { Job, JobCreationAttributes, JobError } from "../models/Job";
import { JobStatus } from "@myeventscheduler/shared/types";
declare class JobService {
    canTransition(from: JobStatus, to: JobStatus): boolean;
    private getJobOrThrow;
    private notifyStatusChange;
    private notifyJobCreated;
    startJob(id: string): Promise<Job | null>;
    completeJob(id: string): Promise<Job | null>;
    failJob(id: string, error: JobError): Promise<Job | null>;
    retryJob(id: string): Promise<Job | null>;
    createJob(data: JobCreationAttributes): Promise<Job>;
    listJobs(filters: any): Promise<Job[] | []>;
    jobById(id: string): Promise<Job | null>;
    deleteJob(id: string): Promise<boolean>;
}
export declare const jobService: JobService;
export {};
