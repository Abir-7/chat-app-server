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
exports.MessageService = exports.getChatMessages = exports.saveChatMessage = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const chat_model_1 = require("../chat.model");
const http_status_1 = __importDefault(require("http-status"));
const message_model_1 = require("./message.model");
// Save a chat message
const saveChatMessage = (senderId, chatId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chat_model_1.Chat.findOne({ _id: chatId });
    if (!chat) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chat not found");
    }
    const messageData = {
        chat: chatId,
        sender: senderId,
        content,
    };
    const newMessage = yield message_model_1.Message.create(messageData);
    const msg = yield message_model_1.Message.findOne({ _id: newMessage._id }).populate({
        path: "sender",
        populate: { path: "customer" },
    });
    chat.latestMessage = newMessage._id;
    yield chat.save();
    return msg;
});
exports.saveChatMessage = saveChatMessage;
// Fetch chat messages between two users
const getChatMessages = (chatId, senderId, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    //single chat
    if (senderId && receiverId) {
        const chat = yield chat_model_1.Chat.findOne({
            users: { $all: [receiverId, senderId] },
            isGroup: false,
        });
        if (!chat) {
            return [];
        }
        const messages = yield message_model_1.Message.find({ chat: chat === null || chat === void 0 ? void 0 : chat._id }).populate({
            path: "sender",
            populate: { path: "customer" },
        });
        if (!messages) {
            return [];
        }
        console.log(messages);
        return messages;
    }
    //group chat
    const chat = yield chat_model_1.Chat.findById(chatId);
    if (!chat) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chat not found");
    }
    const messages = yield message_model_1.Message.find({ chat: chatId }).populate({
        path: "sender",
        populate: { path: "customer" },
    });
    return messages;
});
exports.getChatMessages = getChatMessages;
exports.MessageService = {
    saveChatMessage: exports.saveChatMessage,
    getChatMessages: exports.getChatMessages,
};
