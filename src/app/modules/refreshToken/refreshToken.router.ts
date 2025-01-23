import { Router } from "express";
import { RefreshTokenController } from "./refreshToken.controller";

const router = Router();
router.get("/get-token", RefreshTokenController.getRefreshToken);
export const TokenRouter = router;
