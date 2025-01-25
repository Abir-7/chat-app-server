import AppError from "../../../errors/AppError";
import catchAsync from "../../../utils/shared/catchAsync";
import sendResponse from "../../../utils/shared/sendResponse";
import { MessageService } from "./message.service";

// Save a chat message
export const saveChatMessage = catchAsync(async (req, res) => {
  const { senderId, chatId, content } = req.body;

  const chatMessage = await MessageService.saveChatMessage(
    senderId,
    chatId,
    content
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Message saved successfully",
    data: chatMessage,
  });
});

// Get chat messages between two users
export const getChatMessages = catchAsync(async (req, res) => {
  const { chatId } = req.query;
  const messages = await MessageService.getChatMessages(chatId as string);
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
