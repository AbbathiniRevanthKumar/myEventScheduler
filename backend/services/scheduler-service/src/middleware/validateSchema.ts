import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { ValidationError } from "../utils/error";

export const validateSchema = (
  schema: ZodObject,
  type: "body" | "query" | "params",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = req[type];
    const result = schema.safeParse(input);
     req.validated ??= {};
    if (result.success) {
      req.validated[type] = result.data;
      return next();
    }
    return next(new ValidationError(result.error as any));
  };
};
