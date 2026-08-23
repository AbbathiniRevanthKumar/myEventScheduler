# scheduler service
- main thing is the jobs (events)
1. JOB schema
- JOB = {
    id,
    name,
    description,
    type,
    payload,
    run_at,
    max_attempts,
    attempts,
    status,
    error,
    completed_at,
    created_at,
    updated_at
}
- type : send_email,generate_report,webhook_call,trigger_api
- run_at : can be null , if the job is scheduled immediately,
- status : enum(pending,running,completed,failed,dead_letter),
- error : stores the last_error 
- completed_at can be null if it is failed or not yet completed state.
- payload can be anything as there will different job types -  JSONB
- later queue will use id as job id


JOB states 
pending  → running        (worker picks up the job)
running  → completed      (job succeeds)
running  → failed         (job throws, attempts < max_attempts?) [if failed checks if attempts < max_attempts ? retry : dead_letter ]
failed  → pending        (retry — attempts++, back in queue)  [if failed as above moves to pending]
failed → dead_letter   (attempts >= max_attempts, no more retries)
dead_letter   → pending         (manual retry via API) 

when running -> failed / completed (attempts++)

pending     → running       (worker picks up job,attempts++ here)
running     → completed     (success)
running     → failed        (error;)
failed      → pending        (attempts < max_attempts, auto-retry)
failed      → dead_letter    (attempts >= max_attempts, exhausted)
dead_letter → pending        (manual retry via API; reseting the attempts to zero)
completed   → (terminal, no outgoing transitions)


