"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    name: { type: String },
    isGroup: { type: Boolean, default: false },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose_1.Schema.Types.ObjectId, ref: "Message" },
}, {
    timestamps: true,
});
exports.Chat = (0, mongoose_1.model)("Chat", ChatSchema);
