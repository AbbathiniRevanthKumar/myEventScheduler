"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobQueue = void 0;
const bullmq_1 = require("bullmq");
const types_1 = require("../types");
const connection_1 = require("./connection");
exports.jobQueue = new bullmq_1.Queue(types_1.jobQueueName, { connection: connection_1.redisConnection });
