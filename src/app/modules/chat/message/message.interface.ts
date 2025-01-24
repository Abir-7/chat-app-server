import mongoose from "mongoose";

export interface IMessage {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
}
