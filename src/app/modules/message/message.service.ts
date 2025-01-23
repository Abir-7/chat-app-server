import { ChatMessage } from "./message.model";

// Save a chat message
export const saveChatMessage = async (data: {
  senderId: string;
  receiverId: string;
  message: string;
}) => {
  const { senderId, receiverId, message } = data;

  if (!senderId || !receiverId || !message) {
    throw new Error("All fields are required.");
  }

  // Save the message to the database
  const chatMessage = await ChatMessage.create({
    senderId,
    receiverId,
    message,
  });

  return chatMessage;
};

// Fetch chat messages between two users
export const getChatMessages = async (senderId: string, receiverId: string) => {
  if (!senderId || !receiverId) {
    throw new Error("SenderId and ReceiverId are required.");
  }

  // Query chat messages
  const messages = await ChatMessage.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ timestamp: 1 }); // Sort by timestamp ascending

  return messages;
};

export const MessageService = {
  saveChatMessage,
  getChatMessages,
};
