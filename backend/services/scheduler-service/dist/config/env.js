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
    PG_DATABASE: process.env.PG_DATABASE,
    PG_HOST: process.env.PG_HOST,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_USER: process.env.PG_USER,
    PG_PORT: process.env.PG_PORT,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PORT: process.env.REDIS_PORT || 6379,
};
//# sourceMappingURL=env.js.map