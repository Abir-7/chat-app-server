import { Router } from "express";
import { RefreshTokenController } from "./refreshToken.controller";

const router = Router();
router.get("/refreshToken", RefreshTokenController.getRefreshToken);
export const refreshTokenRouter = router;
