import { z } from "zod";
export declare const createJobSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    type: z.ZodEnum<{
        send_email: "send_email";
        generate_report: "generate_report";
        webhook_call: "webhook_call";
        trigger_api: "trigger_api";
    }>;
    payload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    runAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    maxAttempts: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const listJobsSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        COMPLETED: "COMPLETED";
        RUNNING: "RUNNING";
        FAILED: "FAILED";
        DEAD_LETTER: "DEAD_LETTER";
    }>>;
}, z.core.$strip>;
export declare const jobIdSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export declare const jobErrorSchema: z.ZodObject<{
    error: z.ZodObject<{
        message: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        stack: z.ZodOptional<z.ZodAny>;
    }, z.core.$strip>;
}, z.core.$strip>;
