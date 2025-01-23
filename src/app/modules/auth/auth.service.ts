import { config } from "../../config";
import AppError from "../../errors/AppError";
import { JwtHelper } from "../../utils/shared/jwtHelper";
import { User } from "../user/user.model";
import httpCode from "http-status";
import jwt from "jsonwebtoken";
const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("password email role");

  if (!user) {
    throw new AppError(httpCode.NOT_FOUND, "User not found");
  }
  console.log(user);
  if (await User.passwordMatch(user.password, password)) {
    throw new AppError(httpCode.UNAUTHORIZED, "Invalid password");
  }
  const jwtPayload = {
    userEmail: user.email,
    userId: user._id,
    userRole: user.role,
  };
  const token = JwtHelper.generateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );

  const refreshToken = JwtHelper.generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { token, refreshToken };
};
export const AuthService = { loginUser };
