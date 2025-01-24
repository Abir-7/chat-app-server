import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";
import { ChatService } from "./chat.service";

const createOnetoOneChat = catchAsync(async (req, res) => {
  const { userId1, userId2 } = req.body;
  const result = await ChatService.createOnetoOneChat(userId1, userId2);

  sendResponse(res, {
    data: result,
    statusCode: 201,
    success: true,
    message: "Chat created successfully",
  });
});

const createGroupChat = catchAsync(async (req, res) => {
  const { name, users, creatorId } = req.body;
  const result = await ChatService.createGroupChat({ name, users, creatorId });

  sendResponse(res, {
    data: result,
    statusCode: 201,
    success: true,
    message: "Group Chat created successfully",
  });
});

export const ChatController = {
  createOnetoOneChat,
  createGroupChat,
};
