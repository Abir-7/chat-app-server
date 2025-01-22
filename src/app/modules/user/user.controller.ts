import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";

import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const userData = await UserServices.createUser(req.body);

  sendResponse(res, {
    data: userData,
    statusCode: 201,
    success: true,
    message: "User created successfully",
  });
});

export const UserController = {
  createUser,
};
