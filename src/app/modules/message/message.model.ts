import mongoose, { Schema } from "mongoose";
import { IChatMessage } from "./message.interface";

const ChatMessageSchema: Schema = new Schema<IChatMessage>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const ChatMessage = mongoose.model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);
