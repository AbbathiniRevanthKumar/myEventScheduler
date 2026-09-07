import { Redis } from "ioredis";
import {  } from "@myeventscheduler/shared";
import { redisConnection } from "@myeventscheduler/shared";

export const redisPublisher = new Redis(redisConnection);
