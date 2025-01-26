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
exports.ChatController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/shared/sendResponse"));
const chat_service_1 = require("./chat.service");
const createOnetoOneChat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId1, userId2 } = req.body;
    const result = yield chat_service_1.ChatService.createOnetoOneChat(userId1, userId2);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: 201,
        success: true,
        message: "Chat created successfully",
    });
}));
const createGroupChat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, users, creatorId } = req.body;
    const result = yield chat_service_1.ChatService.createGroupChat({ name, users, creatorId });
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: 201,
        success: true,
        message: "Group Chat created successfully",
    });
}));
const getUserGroupChat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield chat_service_1.ChatService.getUserGroup(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: 201,
        success: true,
        message: "Groups fetched successfully",
    });
}));
exports.ChatController = {
    createOnetoOneChat,
    createGroupChat,
    getUserGroupChat,
};
