import { ICreateGroupChatParams } from "./chat.interface";
import { Chat } from "./chat.model";

const createOnetoOneChat = async (userId1: string, userId2: string) => {
  const existingChat = await Chat.findOne({
    isGroup: false,
    users: { $all: [userId1, userId2] },
  });

  if (existingChat) {
    return existingChat;
  } else {
    const chat = await Chat.create({
      isGroup: false,
      users: [userId1, userId2],
    });
    return chat;
  }
};

const createGroupChat = async (data: ICreateGroupChatParams) => {
  const { name, users, creatorId } = data;

  const chat = await Chat.create({
    name,
    isGroup: true,
    users: [...users, creatorId],
    admins: [creatorId],
  });

  return chat;
};

const getUserGroup = async (userId: string) => {
  const getChatGroup = await Chat.find({
    users: { $in: [userId] },
    isGroup: true,
  }).populate("users");

  return getChatGroup;
};

export const ChatService = {
  createOnetoOneChat,
  createGroupChat,
  getUserGroup,
};
