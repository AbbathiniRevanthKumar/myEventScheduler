declare class SchedulerClient {
    getJob(id: string): Promise<any>;
    startJob(id: string): Promise<any>;
    failJob(id: string, message: any): Promise<any>;
    completeJob(id: string): Promise<any>;
}
export declare const schedulerClient: SchedulerClient;
export {};
