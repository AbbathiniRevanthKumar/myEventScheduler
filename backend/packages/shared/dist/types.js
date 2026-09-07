"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobQueueName = exports.JOB_TYPES = void 0;
var JOB_TYPES;
(function (JOB_TYPES) {
    JOB_TYPES["SEND_EMAIL"] = "send_email";
    JOB_TYPES["TRIGGER_API"] = "trigger_api";
    JOB_TYPES["WEBHOOK_CALL"] = "webook_call";
})(JOB_TYPES || (exports.JOB_TYPES = JOB_TYPES = {}));
exports.jobQueueName = "jobs";
