import jwt from "jsonwebtoken";
import { config } from "../../config";
import { IAuthData } from "../../middleware/Auth/auth.interface";
const verifyRefreshToken = (refreshToken: string) => {
  return new Promise<string | IAuthData>((resolve, reject) => {
    jwt.verify(
      refreshToken,
      config.jwt_refresh_secret as string,
      (err, decoded) => {
        if (err) reject("Invalid or expired refresh token");
        else resolve(decoded as IAuthData);
      }
    );
  });
};

const generateToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn });
};
export const JwtHelper = { verifyRefreshToken, generateToken };
