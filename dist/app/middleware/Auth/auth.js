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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const user_model_1 = require("../../modules/user/user.model");
const auth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenWithBearer = req.headers.authorization;
    if (!tokenWithBearer) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    if (!tokenWithBearer.startsWith("Bearer")) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    if (tokenWithBearer.split(" ")[1] === "null") {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const token = tokenWithBearer.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
        if (decoded.userEmail) {
            const findUser = yield user_model_1.User.findOne({ email: decoded.userEmail });
            if (!findUser) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
            }
        }
        if (roles.length && !roles.includes(decoded.userRole)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
