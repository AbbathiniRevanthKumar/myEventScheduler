"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./config/logger"));
dotenv_1.default.config();
const port = process.env.PORT || "9000";
const startServer = async () => {
    try {
        await db_1.sequelize.authenticate();
        logger_1.default.info("Database Connected");
        app_1.default.listen(port, () => {
            logger_1.default.info(`scheduler-service is running at port ${port}`);
        });
    }
    catch (error) {
        logger_1.default.error("Error at starting service", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map