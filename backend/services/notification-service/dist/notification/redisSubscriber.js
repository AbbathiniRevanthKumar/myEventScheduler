"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSubscriber = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const shared_1 = require("@myeventscheduler/shared");
exports.redisSubscriber = new ioredis_1.default(shared_1.redisConnection);
//# sourceMappingURL=redisSubscriber.js.map