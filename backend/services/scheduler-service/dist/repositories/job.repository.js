"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepository = void 0;
const Job_1 = require("../models/Job");
class JobRepository {
    async createJob(data) {
        return Job_1.Job.create(data, { returning: true });
    }
    async getJobById(id) {
        return Job_1.Job.findByPk(id);
    }
    async listJobs(filters) {
        return Job_1.Job.findAll({
            where: {
                ...(filters.status && { status: filters.status }),
                isActive: true,
            },
            order: [["createdAt", "DESC"]],
            limit: filters.limit ?? 50,
            offset: filters.offset ?? 0,
        });
    }
    async deleteJob(id) {
        const [affectedRows] = await Job_1.Job.update({ isActive: false }, {
            where: {
                id: id,
            },
        });
        return affectedRows > 0;
    }
    async updateJob(id, changes) {
        const [affectedCount, affectedRows] = await Job_1.Job.update(changes, {
            where: { id: id },
            returning: true,
        });
        return affectedRows[0] ?? null;
    }
}
exports.jobRepository = new JobRepository();
//# sourceMappingURL=job.repository.js.map