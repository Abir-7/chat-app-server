import AppError from "../../../errors/AppError";
import { Chat } from "../chat.model";
import HttpStatus from "http-status";

import { Message } from "./message.model";
import path from "path";
// Save a chat message
export const saveChatMessage = async (
  senderId: string,
  chatId: string,
  content: string
) => {
  const chat = await Chat.findOne({ _id: chatId });
  if (!chat) {
    throw new AppError(HttpStatus.NOT_FOUND, "Chat not found");
  }
  const messageData = {
    chat: chatId,
    sender: senderId,
    content,
  };

  const newMessage = await Message.create(messageData);

  const msg = await Message.findOne({ _id: newMessage._id }).populate({
    path: "sender",
    populate: { path: "customer" },
  });

  chat.latestMessage = newMessage._id;
  await chat.save();

  return msg;
};

// Fetch chat messages between two users
export const getChatMessages = async (
  chatId: string,
  senderId: string,
  receiverId: string
) => {
  //single chat
  if (senderId && receiverId) {
    const chat = await Chat.findOne({
      users: { $all: [receiverId, senderId] },
      isGroup: false,
    });

    if (!chat) {
      return [];
    }

    const messages = await Message.find({ chat: chat?._id }).populate({
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
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new AppError(HttpStatus.NOT_FOUND, "Chat not found");
  }
  const messages = await Message.find({ chat: chatId }).populate({
    path: "sender",
    populate: { path: "customer" },
  });

  return messages;
};

export const MessageService = {
  saveChatMessage,
  getChatMessages,
};
