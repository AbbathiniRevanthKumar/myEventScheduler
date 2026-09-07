import winston from "winston";
import { envConstants } from "./env";

const logger = winston.createLogger({
  level: "info",
  format:
    envConstants.APP_ENV === "development"
      ? winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        )
      : winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
  transports: [new winston.transports.Console()],
});

export default logger;
