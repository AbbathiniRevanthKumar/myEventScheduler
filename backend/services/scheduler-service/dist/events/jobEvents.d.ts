import { EventEmitter } from "events";
import { JobStatus } from "@myeventscheduler/shared";
export declare const jobEvents: EventEmitter<any>;
export interface JobStatusChangedEvent {
    jobId: string;
    status: JobStatus;
    previousStatus: JobStatus;
    timestamp: Date;
}
