import app from "./app";
import { config } from "./app/config";
import mongoose from "mongoose";
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri as string);
    console.log("MongoDB connected successfully");

    // Start the server
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process with failure code
  }
}

startServer().catch((err) => console.log(err));
