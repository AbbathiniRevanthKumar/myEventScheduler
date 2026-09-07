import { EventEmitter } from "events";
import { JobStatus } from "@myeventscheduler/shared";

export const jobEvents = new EventEmitter();

export interface JobStatusChangedEvent {
  jobId: string;
  status: JobStatus;
  previousStatus: JobStatus;
  timestamp: Date;
}