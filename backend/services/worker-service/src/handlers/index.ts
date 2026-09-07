import { JOB_TYPES } from "@myeventscheduler/shared";
import { send_email_handler } from "./send_email_handler";

export const handler:Record<string,(payload:any)=>any> = {
    [JOB_TYPES.SEND_EMAIL] :  send_email_handler,
}