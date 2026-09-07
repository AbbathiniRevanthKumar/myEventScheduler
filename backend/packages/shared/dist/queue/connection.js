"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const env_1 = require("../config/env");
exports.redisConnection = {
    host: env_1.envConstants.REDIS_HOST,
    port: Number(env_1.envConstants.REDIS_PORT),
};
