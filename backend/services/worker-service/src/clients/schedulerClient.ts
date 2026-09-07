import axios from "axios";
import { envConstants } from "../config/env";

const BASE_URL = envConstants.SCHEDULER_SERVICE_BASE_URL;
class SchedulerClient {
  async getJob(id: string) {
    try {
      const response = await axios.get(
        `${BASE_URL}/scheduler-service/api/v1/jobs/${id}`,
      );
      return response.data.data ?? null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fetch job: ${error.response?.status ?? "network error"}`,
        );
      }
      throw error;
    }
  }
  async startJob(id: string) {
    try {
      const response = await axios.post(
        `${BASE_URL}/scheduler-service/api/v1/jobs/${id}/start`,
      );
      return response.data.data ?? null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to start job: ${error.response?.status ?? "network error"}`,
        );
      }
      throw error;
    }
  }

  async failJob(id: string, message: any) {
    try {
      const response = await axios.post(
        `${BASE_URL}/scheduler-service/api/v1/jobs/${id}/fail`,
        { error: message },
      );
      return response.data.data ?? null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to fail job: ${error.response?.status ?? "network error"}`,
        );
      }
      throw error;
    }
  }

  async completeJob(id: string) {
    try {
      const response = await axios.post(
        `${BASE_URL}/scheduler-service/api/v1/jobs/${id}/complete`,
      );
      return response.data.data ?? null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to complete job: ${error.response?.status ?? "network error"}`,
        );
      }
      throw error;
    }
  }
}

export const schedulerClient = new SchedulerClient();
