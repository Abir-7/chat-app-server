import { config } from "../../config";
import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req, res, next) => {
  const result = await AuthService.loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    data: result.token,
    statusCode: 201,
    success: true,
    message: "User login successfully",
  });
});

export const AuthController = {
  logInUser,
};
