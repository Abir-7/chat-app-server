"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouter = void 0;
const express_1 = require("express");
const message_controller_1 = require("./message.controller");
const auth_1 = __importDefault(require("../../../middleware/Auth/auth"));
const router = (0, express_1.Router)();
router.post("/send-message", (0, auth_1.default)("USER"), message_controller_1.MessageController.saveChatMessage);
router.get("/get-message", (0, auth_1.default)("USER"), message_controller_1.MessageController.getChatMessages);
exports.MessageRouter = router;
