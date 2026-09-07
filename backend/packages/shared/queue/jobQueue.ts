import { Queue } from "bullmq";
import { jobQueueName } from "../types";
import { redisConnection } from "./connection";

export const jobQueue = new Queue(jobQueueName, { connection: redisConnection });
