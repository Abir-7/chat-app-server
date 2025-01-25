import catchAsync from "../../utils/shared/catchAsync";
import getFilePath from "../../utils/shared/getFilePath";
import sendResponse from "../../utils/shared/sendResponse";

import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  let image;
  if (req.files && "image" in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const value = {
    ...req.body,
    image,
  };

  const userData = await UserServices.createUser(value);

  sendResponse(res, {
    data: userData,
    statusCode: 201,
    success: true,
    message: "User created successfully",
  });
});

const getAllUserForChat = catchAsync(async (req, res, next) => {
  const user = req.user;
  const users = await UserServices.getAllUserForChat(user?.userEmail);
  sendResponse(res, {
    data: users,
    statusCode: 200,
    success: true,
    message: "All users fetched successfully",
  });
});

export const UserController = {
  createUser,
  getAllUserForChat,
};
