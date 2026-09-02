import Redis from "ioredis";
import { redisConnection } from "../queue/connection";


export const redisSubscriber = new Redis(redisConnection);