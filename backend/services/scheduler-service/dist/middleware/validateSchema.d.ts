import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
export declare const validateSchema: (schema: ZodObject, type: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => void;
