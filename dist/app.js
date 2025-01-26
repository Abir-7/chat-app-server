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
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const noRoute_1 = require("./app/middleware/noRoute");
const router_1 = __importDefault(require("./app/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const message_model_1 = require("./app/modules/chat/message/message.model");
const chat_service_1 = require("./app/modules/chat/chat.service");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "*" }));
////////////////
app.use(express_1.default.static("uploads"));
app.use(express_1.default.urlencoded({ extended: true }));
//////////////
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", router_1.default);
app.use(noRoute_1.noRouteFound);
app.use(globalErrorHandler_1.globalErrorHandler);
// socket implimentetion
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"],
    },
});
const users = new Map();
io.on("connection", (socket) => {
    // console.log("A user connected: " + socket.id);
    // Store the socket ID when a user connects
    socket.on("register", (userId) => {
        users.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });
    // Handle sending messages one to one
    socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, receiverId, message }) {
        //  console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
        var _b;
        // Get the receiver's socket ID
        const receiverSocketId = users.get(receiverId);
        const chat = yield chat_service_1.ChatService.createOnetoOneChat(senderId, receiverId);
        console.log(chat._id);
        const res = (yield (yield message_model_1.Message.create({
            chat: chat._id,
            content: message,
            sender: senderId,
        })).populate({
            path: "sender",
            populate: { path: "customer" },
        }));
        console.log(res, "ggg");
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", {
                sender: { _id: res.sender._id, name: (_b = res.sender) === null || _b === void 0 ? void 0 : _b.customer.name },
                receiverId,
                content: res.content,
            });
        }
    }));
    // Handle sending messages group
    socket.on("joinGroup", (chat) => {
        socket.join(chat);
        console.log(`User ${socket.id} joined group ${chat}`);
    });
    socket.on("sendMessageToGroup", (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { chat, sender, content } = data;
        console.log(data);
        const res = (yield (yield message_model_1.Message.create({
            chat: chat,
            content,
            sender,
        })).populate({
            path: "sender",
            populate: { path: "customer" },
        }));
        io.to(chat).emit("receiveGroupMessage", {
            sender: { _id: res.sender._id, name: (_a = res.sender) === null || _a === void 0 ? void 0 : _a.customer.name },
            chat,
            content,
        });
    }));
    socket.on("disconnect", () => {
        // Remove user from the mapping when they disconnect
        users.forEach((socketId, userId) => {
            if (socketId === socket.id) {
                users.delete(userId);
                console.log(`User ${userId} disconnected`);
            }
        });
    });
});
