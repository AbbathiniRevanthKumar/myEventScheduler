import { NextFunction, Request, Response } from "express";
declare class JobController {
    createJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    listJobs: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    jobById: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    deleteJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    startJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    failJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    completeJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
    retryJob: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
}
export declare const jobController: JobController;
export {};
