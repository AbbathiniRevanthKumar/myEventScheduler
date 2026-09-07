"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const job_route_1 = require("./job.route");
const router = express_1.default.Router();
router.use("/jobs", job_route_1.jobRouter);
exports.v1Router = router;
//# sourceMappingURL=index.js.map