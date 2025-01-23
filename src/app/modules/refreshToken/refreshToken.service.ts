import AppError from "../../errors/AppError";
import HttpStatus from "http-status";
import { JwtHelper } from "../../utils/shared/jwtHelper";
import { config } from "../../config";
import { IAuthData } from "../../middleware/Auth/auth.interface";
const getRefreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Refresh token not found");
  }
  const user = (await JwtHelper.verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string
  )) as IAuthData;
  console.log(user);
  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Invalid token");
  }
  const jwtPayload = {
    userEmail: user.userEmail,
    userId: user.userId,
    userRole: user.userRole,
  };
  const newToken = JwtHelper.generateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );

  return newToken;
};

export const RefreshTokenService = { getRefreshToken };
