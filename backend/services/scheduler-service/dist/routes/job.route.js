"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateSchema_1 = require("../middleware/validateSchema");
const job_1 = require("../utils/vaildations/job");
const job_controller_1 = require("../controllers/job.controller");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.validateSchema)(job_1.createJobSchema, "body"), job_controller_1.jobController.createJob);
router.get("/", (0, validateSchema_1.validateSchema)(job_1.listJobsSchema, "query"), job_controller_1.jobController.listJobs);
router.get("/:id", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), job_controller_1.jobController.jobById);
router.post("/:id/start", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), job_controller_1.jobController.startJob);
router.post("/:id/complete", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), job_controller_1.jobController.completeJob);
router.post("/:id/fail", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), (0, validateSchema_1.validateSchema)(job_1.jobErrorSchema, "body"), job_controller_1.jobController.failJob);
router.post("/:id/retry", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), job_controller_1.jobController.retryJob);
router.delete("/:id", (0, validateSchema_1.validateSchema)(job_1.jobIdSchema, "params"), job_controller_1.jobController.deleteJob);
exports.jobRouter = router;
//# sourceMappingURL=job.route.js.map