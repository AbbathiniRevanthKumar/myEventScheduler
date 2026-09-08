import { envConstants } from "../config/env";

export const redisConnection = {
    host : envConstants.REDIS_HOST,
    port : Number(envConstants.REDIS_PORT),
    password : envConstants.REDIS_PASSWORD
}