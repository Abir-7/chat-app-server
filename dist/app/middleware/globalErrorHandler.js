"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseErrorHandler_1 = require("../errors/mongooseErrorHandler");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errors = [];
    // Handle Mongoose specific errors
    if (err instanceof mongoose_1.default.Error) {
        const mongooseError = (0, mongooseErrorHandler_1.handleMongooseError)(err);
        statusCode = mongooseError.statusCode;
        message = mongooseError.message;
        errors = mongooseError.errors;
    }
    // General Error Handling
    console.log(err); // Log the error details for debugging
    res.status(statusCode).json(Object.assign({ status: "error", message, errors: errors.length ? errors : undefined }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
};
exports.globalErrorHandler = globalErrorHandler;
