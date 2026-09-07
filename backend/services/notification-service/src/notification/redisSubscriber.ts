import Redis from "ioredis";
import { redisConnection } from "@myeventscheduler/shared";


export const redisSubscriber = new Redis(redisConnection);