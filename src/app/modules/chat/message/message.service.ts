import AppError from "../../../errors/AppError";
import { Chat } from "../chat.model";
import HttpStatus from "http-status";

import { Message } from "./message.model";
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
  chat.latestMessage = newMessage._id;
  await chat.save();

  return newMessage;
};

// Fetch chat messages between two users
export const getChatMessages = async (chatId: string) => {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new AppError(HttpStatus.NOT_FOUND, "Chat not found");
  }
  const messages = await Message.find({ chat: chatId });

  return messages;
};

export const MessageService = {
  saveChatMessage,
  getChatMessages,
};
