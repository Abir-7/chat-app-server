"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../../utils/shared/jwtHelper");
const config_1 = require("../../config");
const getRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!refreshToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Refresh token not found");
    }
    const user = (yield jwtHelper_1.JwtHelper.verifyToken(refreshToken, config_1.config.jwt_refresh_secret));
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token");
    }
    const jwtPayload = {
        userEmail: user.userEmail,
        userId: user.userId,
        userRole: user.userRole,
    };
    const newToken = jwtHelper_1.JwtHelper.generateToken(jwtPayload, config_1.config.jwt_secret, config_1.config.jwt_expires_in);
    return newToken;
});
exports.RefreshTokenService = { getRefreshToken };
