import { Model, Optional } from "sequelize";
export interface JobError {
    message: string;
    stack?: string;
    code?: string;
}
export interface JobAttributes {
    id: string;
    name: string;
    description: string | null;
    type: string;
    payload: Record<string, unknown> | null;
    runAt: Date | null;
    maxAttempts: number;
    attempts: number;
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "DEAD_LETTER";
    error: JobError | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}
export interface JobCreationAttributes extends Optional<JobAttributes, "id" | "attempts" | "status" | "error" | "completedAt" | "isActive" | "createdAt" | "updatedAt"> {
}
export declare class Job extends Model<JobAttributes, JobCreationAttributes> {
    id: string;
    name: string;
    description: string | null;
    type: string;
    payload: Record<string, unknown> | null;
    runAt: Date | null;
    maxAttempts: number;
    attempts: number;
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "DEAD_LETTER";
    error: JobError | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}
