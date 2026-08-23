import { Sequelize } from "sequelize";
import { envConstants } from "./env";

export const sequelize = new Sequelize({
  host: envConstants.PG_HOST,
  database: envConstants.PG_DATABASE,
  password: String(envConstants.PG_PASSWORD),
  username: String(envConstants.PG_USER),
  port: Number(envConstants.PG_PORT),
  dialect: "postgres",
});
