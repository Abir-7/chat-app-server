import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { JwtHelper } from "../../utils/shared/jwtHelper";
const getRefreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Refresh token not found");
  }
  const user = await JwtHelper.verifyRefreshToken(refreshToken);
};

export const RefreshTokenService = { getRefreshToken };
