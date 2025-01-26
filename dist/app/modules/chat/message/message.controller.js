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
exports.MessageController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/shared/sendResponse"));
const message_service_1 = require("./message.service");
// Save a chat message
const saveChatMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, chatId, content } = req.body;
    const chatMessage = yield message_service_1.MessageService.saveChatMessage(senderId, chatId, content);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Message saved successfully",
        data: chatMessage,
    });
}));
// Get chat messages between two users
const getChatMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId, receiverId } = req.query;
    const messages = yield message_service_1.MessageService.getChatMessages(chatId, senderId, receiverId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Messages fetched successfully",
        data: messages,
    });
}));
exports.MessageController = {
    saveChatMessage,
    getChatMessages,
};
