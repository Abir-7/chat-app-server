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
exports.AuthService = void 0;
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwtHelper_1 = require("../../utils/shared/jwtHelper");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const user = yield user_model_1.User.findOne({ email }).select("password email role");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (yield user_model_1.User.passwordMatch(user.password, password)) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid password");
    }
    const jwtPayload = {
        userEmail: user.email,
        userId: user._id,
        userRole: user.role,
    };
    const token = jwtHelper_1.JwtHelper.generateToken(jwtPayload, config_1.config.jwt_secret, config_1.config.jwt_expires_in);
    const refreshToken = jwtHelper_1.JwtHelper.generateToken(jwtPayload, config_1.config.jwt_refresh_secret, config_1.config.jwt_refresh_expires_in);
    return { token, refreshToken };
});
exports.AuthService = { loginUser };
