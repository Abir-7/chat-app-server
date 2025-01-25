import { NextFunction, Request, Response, Router } from "express";
import { zodCreateUserSchema } from "./user.validation";
import { validateRequest } from "../../middleware/zodValidator";
import { UserController } from "./user.controller";
import upload from "../../middleware/FileUploadHandler";
import { parseField } from "../../middleware/parseDataMiddleware";
import fileUploadHandler from "../../middleware/FileUploadHandler";
import auth from "../../middleware/Auth/auth";

const router = Router();

// router.post(
//   "/create-user",
//   validateRequest(zodCreateUserSchema),
//   UserController.createUser
// );

router.post(
  "/create-user",
  fileUploadHandler(),
  parseField("data"),
  // validateRequest(zodCreateUserSchema),
  UserController.createUser
);

router.get("/get-all-user", auth("USER"), UserController.getAllUserForChat);

export const UserRouter = router;
