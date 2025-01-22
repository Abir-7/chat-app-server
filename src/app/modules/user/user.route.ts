import { Router } from "express";
import { zodCreateUserSchema } from "./user.validation";
import { validateRequest } from "../../middleware/zodValidator";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create-user",
  validateRequest(zodCreateUserSchema),
  UserController.createUser
);

export const UserRouter = router;
