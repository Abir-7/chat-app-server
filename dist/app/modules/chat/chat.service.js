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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const chat_model_1 = require("./chat.model");
const createOnetoOneChat = (userId1, userId2) => __awaiter(void 0, void 0, void 0, function* () {
    const existingChat = yield chat_model_1.Chat.findOne({
        isGroup: false,
        users: { $all: [userId1, userId2] },
    });
    if (existingChat) {
        return existingChat;
    }
    else {
        const chat = yield chat_model_1.Chat.create({
            isGroup: false,
            users: [userId1, userId2],
        });
        return chat;
    }
});
const createGroupChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, users, creatorId } = data;
    const chat = yield chat_model_1.Chat.create({
        name,
        isGroup: true,
        users: [...users, creatorId],
        admins: [creatorId],
    });
    return chat;
});
const getUserGroup = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getChatGroup = yield chat_model_1.Chat.find({
        users: { $in: [userId] },
        isGroup: true,
    }).populate("users");
    return getChatGroup;
});
exports.ChatService = {
    createOnetoOneChat,
    createGroupChat,
    getUserGroup,
};
