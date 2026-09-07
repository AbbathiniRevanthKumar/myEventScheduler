import { WebSocket, WebSocketServer } from "ws";
import { connectionmanager } from "./connectionManager";
import { redisSubscriber } from "./redisSubscriber";
import logger from "../config/logger";

const port = process.env.NOTIFICATION_PORT || "9002";

const wss = new WebSocketServer({ port: Number(port) });

wss.on("connection", (ws: WebSocket) => {
  try {
    connectionmanager.addClient(ws);
    logger.info("Connecting with new web socket client :");

    ws.on("close", () => {
      connectionmanager.removeClient(ws);
      logger.info("Disconnecting with new web socket client :", ws);
    });
  } catch (error) {
    logger.error("Error connecting to the clients");
  }
});

redisSubscriber.subscribe(
  "job-status-channel",
  "job-create-channel",
  (err, count) => {
    if (err) {
      logger.error("Cannot subscribe", err);
      return;
    }
    logger.info(`Subscribed..., count=${count}`);
  },
);

redisSubscriber.on("message", (channel, message) => {
  try {
    console.log("Received from:", channel);
    // console.log("Message:", message);
    const payload = JSON.parse(message);
    connectionmanager.broadCast(payload);
  } catch (error) {
    logger.error("Failed to process status message", error);
  }
});
