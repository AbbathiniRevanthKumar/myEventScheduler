"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = require("./env");
exports.sequelize = new sequelize_1.Sequelize({
    host: env_1.envConstants.PG_HOST,
    database: env_1.envConstants.PG_DATABASE,
    password: String(env_1.envConstants.PG_PASSWORD),
    username: String(env_1.envConstants.PG_USER),
    port: Number(env_1.envConstants.PG_PORT),
    dialect: "postgres",
    logging: false
});
//# sourceMappingURL=db.js.map