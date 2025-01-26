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
exports.AuthController = void 0;
const config_1 = require("../../config");
const catchAsync_1 = __importDefault(require("../../utils/shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const logInUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.loginUser(req.body);
    console.log(result.refreshToken, "refreshToken");
    res.cookie("refreshToken", result.refreshToken, {
        secure: config_1.config.node_env === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        data: result.token,
        statusCode: 201,
        success: true,
        message: "User login successfully",
    });
}));
exports.AuthController = {
    logInUser,
};
