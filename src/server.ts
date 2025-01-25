import { app, server } from "./app";
import { config } from "./app/config";
import mongoose from "mongoose";

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Exit process with failure code
});

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri as string);
    console.log("MongoDB connected successfully");

    // Start the server
    server.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process with failure code
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  if (server) {
    server.close(() => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });
  } else {
    process.exit(1); // Exit process with failure code
  }
});

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
