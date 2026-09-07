import express from "express";
import { jobRouter } from "./job.route";

const router = express.Router();

router.use("/jobs", jobRouter);

export const v1Router = router;
