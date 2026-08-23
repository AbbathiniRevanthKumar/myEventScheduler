import { z } from "zod";

export const createJobSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  type: z.enum([
    "send_email",
    "generate_report",
    "webhook_call",
    "trigger_api",
  ]),
  payload: z.record(z.string(), z.any()).optional(),
  runAt: z.coerce.date().optional(),
  maxAttempts: z.number().optional().default(3),
});

export const listJobsSchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().nonnegative().optional(),
  status: z
    .enum(["PENDING", "COMPLETED", "RUNNING", "FAILED", "DEAD_LETTER"])
    .optional(),
});

export const jobIdSchema = z.object({
  id: z.uuid(),
});

export const jobErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    stack: z.any().optional(),
  }),
});
