import { Response } from "express";
export declare class ResponseHandler {
    static success(res: Response, data?: unknown, message?: string, statusCode?: number): Response<any, Record<string, any>>;
    static error(res: Response, message?: string, statusCode?: number, errors?: any[]): Response<any, Record<string, any>>;
}
