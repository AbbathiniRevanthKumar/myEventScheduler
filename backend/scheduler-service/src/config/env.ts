// env from .env file for now
import dotenv from "dotenv";
import path from "path";
const appEnv = process.env.APP_ENV || "development";
const envFilePath = path.resolve(process.cwd(), `.env.${appEnv}`);

dotenv.config({ path: envFilePath });

console.log(`Using env variables from file - ${envFilePath}`);

export const envConstants = {
  APP_ENV: appEnv,
  PG_DATABASE: process.env.PG_DATABASE!,
  PG_HOST: process.env.PG_HOST!,
  PG_PASSWORD: process.env.PG_PASSWORD!,
  PG_USER: process.env.PG_USER!,
  PG_PORT: process.env.PG_PORT!,
};
