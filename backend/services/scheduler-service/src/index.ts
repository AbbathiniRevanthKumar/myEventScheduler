import app from "./app";
import dotenv from "dotenv";
import { sequelize } from "./config/db";
import logger from "./config/logger";

dotenv.config();
const port = process.env.PORT || "9000";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database Connected");
    app.listen(port, () => {
      logger.info(`scheduler-service is running at port ${port}`);
    });
  } catch (error) {
    logger.error("Error at starting service",error);
    process.exit(1);
  }
};

startServer();