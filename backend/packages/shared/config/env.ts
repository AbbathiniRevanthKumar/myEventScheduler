// env from .env file for now
import dotenv from "dotenv";
import path from "path";
const appEnv = process.env.APP_ENV || "development";
const envFilePath = path.resolve(process.cwd(), `.env.${appEnv}`);

dotenv.config({ path: envFilePath });

console.log(`Using env variables from file - ${envFilePath}`);

export const envConstants = {
  APP_ENV: appEnv,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};
