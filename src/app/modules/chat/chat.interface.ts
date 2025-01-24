import mongoose from "mongoose";

export interface IChat extends Document {
  name?: string;
  isGroup: boolean;
  users: mongoose.Types.ObjectId[];
  latestMessage?: mongoose.Types.ObjectId;
}

export interface ICreateGroupChatParams {
  name: string;
  users: string[];
  creatorId: string;
}
