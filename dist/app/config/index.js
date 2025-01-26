"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    host_email: process.env.HOST_EMAIL,
    host_email_pass: process.env.HOST_EMAIL_PASSWORD,
    host_email_service: process.env.HOST_EMAIL_SERVICE,
    host_email_service_port: process.env.HOST_EMAIL_SERVICE_PORT,
    node_env: process.env.NODE_ENV,
};
