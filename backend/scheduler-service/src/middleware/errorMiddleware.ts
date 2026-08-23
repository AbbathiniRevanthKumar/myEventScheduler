import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { AppError } from "../utils/error";
import { envConstants } from "../config/env";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return ResponseHandler.error(res, err.message, err.statusCode, err.errors);
  }
  // Unexpected error — log the real details server-side, but don't leak internals to the client
  console.error(err); // or your real logger
  return ResponseHandler.error(
    res,
    "Internal server error",
    500,
    envConstants.APP_ENV === "local" ? (err as any) : [],
  );
};
