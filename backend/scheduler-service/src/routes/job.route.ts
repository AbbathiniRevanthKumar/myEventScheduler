import express from "express";
import { validateSchema } from "../middleware/validateSchema";
import {
  createJobSchema,
  jobErrorSchema,
  jobIdSchema,
  listJobsSchema,
} from "../utils/vaildations/job";
import { jobController } from "../controllers/job.controller";

const router = express.Router();

router.post(
  "/",
  validateSchema(createJobSchema, "body"),
  jobController.createJob,
);
router.get(
  "/",
  validateSchema(listJobsSchema, "query"),
  jobController.listJobs,
);

router.get(
  "/:id",
  validateSchema(jobIdSchema, "params"),
  jobController.jobById,
);

router.post(
  "/:id/start",
  validateSchema(jobIdSchema, "params"),
  jobController.startJob,
);
router.post(
  "/:id/complete",
  validateSchema(jobIdSchema, "params"),
  jobController.completeJob,
);
router.post(
  "/:id/fail",
  validateSchema(jobIdSchema, "params"),
  validateSchema(jobErrorSchema, "body"),
  jobController.failJob,
);
router.post(
  "/:id/retry",
  validateSchema(jobIdSchema, "params"),
  jobController.retryJob,
);

router.delete(
  "/:id",
  validateSchema(jobIdSchema, "params"),
  jobController.deleteJob,
);

export const jobRouter = router;
