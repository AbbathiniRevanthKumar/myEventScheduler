import { Response } from "express";

export class ResponseHandler {
  static success(
    res: Response,
    data: unknown = [],
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
      errors: [],
    });
  }

  static error(
    res: Response,
    message = "Internal Server Error",
    statusCode = 500,
    errors: any[] = []
  ) {
    return res.status(statusCode).json({
      success: false,
      data: null,
      message,
      errors,
    });
  }
}