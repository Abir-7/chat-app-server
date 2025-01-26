"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRouter = void 0;
const express_1 = require("express");
const refreshToken_controller_1 = require("./refreshToken.controller");
const router = (0, express_1.Router)();
router.get("/get-token", refreshToken_controller_1.RefreshTokenController.getRefreshToken);
exports.TokenRouter = router;
