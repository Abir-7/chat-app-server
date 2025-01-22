import { Router } from "express";
import { validateRequest } from "../../middleware/zodValidator";
import { zodUserLoginSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  validateRequest(zodUserLoginSchema),
  AuthController.logInUser
);

export const AuthRouter = router;
