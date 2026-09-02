import { EventEmitter } from "events";
import { JobStatus } from "../utils/types";

export const jobEvents = new EventEmitter();

export interface JobStatusChangedEvent {
  jobId: string;
  status: JobStatus;
  previousStatus: JobStatus;
  timestamp: Date;
}