  const dotenv = require("dotenv");
  const path = require("path");

  dotenv.config();
  const appEnv = process.env.APP_ENV || "development";

  const envFilePath = path.resolve(process.cwd() ,`.env.${appEnv}`);

  dotenv.config({ path: envFilePath });

  console.log(`Using env variables from ${envFilePath}`);

  console.log({
  APP_ENV: process.env.APP_ENV,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_USER: process.env.PG_USER,
  PG_PORT: process.env.PG_PORT,
});

  module.exports = {
    development: {
      username: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: String(process.env.PG_PASSWORD),
      port: process.env.PG_PORT,
      dialect: "postgres",
    },
    test: {},

    production: {
      username: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: String(process.env.PG_PASSWORD),
      port: process.env.PG_PORT,
      dialect: "postgres",
    },
  };
