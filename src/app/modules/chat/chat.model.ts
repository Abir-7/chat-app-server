import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const ChatSchema = new Schema<IChat>(
  {
    name: { type: String },
    isGroup: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);
export const Chat = model<IChat>("Chat", ChatSchema);
