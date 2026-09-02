import { Redis } from "ioredis";
import { redisConnection } from "../queue/connection";

export const redisPublisher = new Redis(redisConnection);
