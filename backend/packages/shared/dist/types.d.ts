export type JobStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "DEAD_LETTER";
export declare enum JOB_TYPES {
    "SEND_EMAIL" = "send_email",
    "TRIGGER_API" = "trigger_api",
    "WEBHOOK_CALL" = "webook_call"
}
export declare const jobQueueName = "jobs";
