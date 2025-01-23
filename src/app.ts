import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { noRouteFound } from "./app/middleware/noRoute";
import router from "./app/router";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

////////////////
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
//////////////

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

app.use(noRouteFound);
app.use(globalErrorHandler);

export default app;
