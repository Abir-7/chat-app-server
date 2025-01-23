import AppError from "../../errors/AppError";
import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";
import { MessageService } from "./message.service";

// Save a chat message
export const saveChatMessage = catchAsync(async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  const chatMessage = await MessageService.saveChatMessage({
    senderId,
    receiverId,
    message,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Message saved successfully",
    data: chatMessage,
  });
});

// Get chat messages between two users
export const getChatMessages = catchAsync(async (req, res) => {
  const { senderId, receiverId } = req.query;
  console.log(senderId, receiverId);
  if (!senderId || !receiverId) {
    throw new AppError(500, "SenderId and ReceiverId are required.");
  }

  const messages = await MessageService.getChatMessages(
    senderId as string,
    receiverId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Messages fetched successfully",
    data: messages,
  });
});

export const MessageController = {
  saveChatMessage,
  getChatMessages,
};
