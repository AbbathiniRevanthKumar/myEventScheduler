import logger from "../config/logger";

export const send_email_handler = async(payload: any) => {
  logger.info("sending email to", payload);
};
