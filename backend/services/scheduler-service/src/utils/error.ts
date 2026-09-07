import { ZodError } from "zod";

export abstract class AppError extends Error {
  public message: string;
  public statusCode: number = 500;
  public name: string = "App error";
  public errors: any[] = [];

  constructor(
    message: string,
    statusCode: number,
    name: string,
    errors: any[] = [],
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
    this.errors = errors;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, "NotFoundError");
  }
}

export class InvalidTransitionError extends AppError {
  constructor(message: string) {
    super(message, 409, "InvalidTransitionError");
  }
}

export class CustomError extends AppError {
  constructor(message: string, statusCode: number, name: string) {
    super(message, statusCode, name);
  }
}

export class ValidationError extends AppError {
  constructor(error: ZodError) {
    super(error.message, 400, "ValidationError",error.issues);
  }
}
