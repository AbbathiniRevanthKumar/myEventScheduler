import logger from "../config/logger";

export const send_email_handler = async (payload: any) => {
  const date = Date.now();
  while(date + 3000 > Date.now()){
    // logger.info("sending email");
  }
};
