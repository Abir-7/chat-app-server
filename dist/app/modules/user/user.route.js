"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const parseDataMiddleware_1 = require("../../middleware/parseDataMiddleware");
const FileUploadHandler_1 = __importDefault(require("../../middleware/FileUploadHandler"));
const auth_1 = __importDefault(require("../../middleware/Auth/auth"));
const router = (0, express_1.Router)();
// router.post(
//   "/create-user",
//   validateRequest(zodCreateUserSchema),
//   UserController.createUser
// );
router.post("/create-user", (0, FileUploadHandler_1.default)(), (0, parseDataMiddleware_1.parseField)("data"), 
// validateRequest(zodCreateUserSchema),
user_controller_1.UserController.createUser);
router.get("/get-all-user", (0, auth_1.default)("USER"), user_controller_1.UserController.getAllUserForChat);
exports.UserRouter = router;
