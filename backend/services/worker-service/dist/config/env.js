"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConstants = void 0;
// env from .env file for now
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const appEnv = process.env.APP_ENV || "development";
const envFilePath = path_1.default.resolve(process.cwd(), `.env.${appEnv}`);
dotenv_1.default.config({ path: envFilePath });
console.log(`Using env variables from file - ${envFilePath}`);
exports.envConstants = {
    APP_ENV: appEnv,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SCHEDULER_SERVICE_BASE_URL: process.env.SCHEDULER_SERVICE_BASE_URL || "http://localhost:9001",
};
//# sourceMappingURL=env.js.map