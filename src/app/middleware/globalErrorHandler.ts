// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
import { handleMongooseError } from "../errors/mongooseErrorHandler";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errors: any = [];

  // Handle Mongoose specific errors
  if (err instanceof mongoose.Error) {
    const mongooseError = handleMongooseError(err);
    statusCode = mongooseError.statusCode;
    message = mongooseError.message;
    errors = mongooseError.errors;
  }

  // General Error Handling
  console.log(err); // Log the error details for debugging

  res.status(statusCode).json({
    status: "error",
    message,
    errors: errors.length ? errors : undefined,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
