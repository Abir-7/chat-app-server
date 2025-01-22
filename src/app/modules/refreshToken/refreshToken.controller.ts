import catchAsync from "../../utils/shared/catchAsync";
import sendResponse from "../../utils/shared/sendResponse";
import { RefreshTokenService } from "./refreshToken.service";

const getRefreshToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await RefreshTokenService.getRefreshToken(refreshToken);
  sendResponse(res, {
    data: result,
    statusCode: 201,
    success: true,
    message: "New token created successfully",
  });
});

export const RefreshTokenController = {
  getRefreshToken,
};
