"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisPublisher = void 0;
const ioredis_1 = require("ioredis");
const shared_1 = require("@myeventscheduler/shared");
exports.redisPublisher = new ioredis_1.Redis(shared_1.redisConnection);
//# sourceMappingURL=redisPublisher.js.map