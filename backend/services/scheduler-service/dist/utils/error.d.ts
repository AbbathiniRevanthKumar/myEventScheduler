import { ZodError } from "zod";
export declare abstract class AppError extends Error {
    message: string;
    statusCode: number;
    name: string;
    errors: any[];
    constructor(message: string, statusCode: number, name: string, errors?: any[]);
}
export declare class NotFoundError extends AppError {
    constructor(message: string);
}
export declare class InvalidTransitionError extends AppError {
    constructor(message: string);
}
export declare class CustomError extends AppError {
    constructor(message: string, statusCode: number, name: string);
}
export declare class ValidationError extends AppError {
    constructor(error: ZodError);
}
