"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        console.log(token, "Token being verified");
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err.message); // Log error for debugging
                reject("Invalid or expired token");
            }
            else {
                resolve(decoded);
            }
        });
    });
};
const generateToken = (payload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.JwtHelper = { verifyToken, generateToken };
