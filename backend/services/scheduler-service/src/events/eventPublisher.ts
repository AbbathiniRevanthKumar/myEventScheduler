import logger from "../config/logger";
import { jobEvents, JobStatusChangedEvent } from "./jobEvents";
import { redisPublisher } from "./redisPublisher";

logger.info("Registering Events");

jobEvents.on("statusChanged", async (payload: JobStatusChangedEvent) => {
  try {
    const data = {
      type: "JOB_STATUS_CHANGE",
      payload: payload,
    };
    await redisPublisher.publish("job-status-channel", JSON.stringify(data));
  } catch (error) {
    logger.error("Failed to publish job status", error);
  }
});

jobEvents.on("jobCreated", async (payload) => {
  try {
    const data = {
      type: "JOB_CREATED",
      payload: payload,
    };
    await redisPublisher.publish("job-create-channel", JSON.stringify(data));
  } catch (error) {
    logger.error("Failed to publish new job", error);
  }
});
