import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { noRouteFound } from "./app/middleware/noRoute";
import router from "./app/router";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.use(noRouteFound);
app.use(globalErrorHandler);

export default app;
