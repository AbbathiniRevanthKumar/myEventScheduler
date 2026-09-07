"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const connectionManager_1 = require("./connectionManager");
const redisSubscriber_1 = require("./redisSubscriber");
const logger_1 = __importDefault(require("../config/logger"));
const port = process.env.NOTIFICATION_PORT || "9002";
const wss = new ws_1.WebSocketServer({ port: Number(port) });
wss.on("connection", (ws) => {
    try {
        connectionManager_1.connectionmanager.addClient(ws);
        logger_1.default.info("Connecting with new web socket client :");
        ws.on("close", () => {
            connectionManager_1.connectionmanager.removeClient(ws);
            logger_1.default.info("Disconnecting with new web socket client :", ws);
        });
    }
    catch (error) {
        logger_1.default.error("Error connecting to the clients");
    }
});
redisSubscriber_1.redisSubscriber.subscribe("job-status-channel", "job-create-channel", (err, count) => {
    if (err) {
        logger_1.default.error("Cannot subscribe", err);
        return;
    }
    logger_1.default.info(`Subscribed..., count=${count}`);
});
redisSubscriber_1.redisSubscriber.on("message", (channel, message) => {
    try {
        console.log("Received from:", channel);
        // console.log("Message:", message);
        const payload = JSON.parse(message);
        connectionManager_1.connectionmanager.broadCast(payload);
    }
    catch (error) {
        logger_1.default.error("Failed to process status message", error);
    }
});
//# sourceMappingURL=server.js.map