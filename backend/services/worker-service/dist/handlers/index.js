"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const shared_1 = require("@myeventscheduler/shared");
const send_email_handler_1 = require("./send_email_handler");
exports.handler = {
    [shared_1.JOB_TYPES.SEND_EMAIL]: send_email_handler_1.send_email_handler,
};
//# sourceMappingURL=index.js.map