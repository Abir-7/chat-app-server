import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import httpCode from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { IAuthData } from "./auth.interface";
import { User } from "../../modules/user/user.model";
import { TUserRole } from "../../modules/user/user.interface";

const auth =
  (...roles: TUserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(httpCode.UNAUTHORIZED, "You are not authorized");
    }
    if (!tokenWithBearer.startsWith("Bearer")) {
      throw new AppError(httpCode.UNAUTHORIZED, "You are not authorized");
    }
    if (tokenWithBearer.split(" ")[1] === "null") {
      throw new AppError(httpCode.UNAUTHORIZED, "You are not authorized");
    }
    const token = tokenWithBearer.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as IAuthData;

      if (decoded.userEmail) {
        const findUser = await User.findOne({ email: decoded.userEmail });
        if (!findUser) {
          throw new AppError(httpCode.UNAUTHORIZED, "You are not authorized");
        }
      }

      if (roles.length && !roles.includes(decoded.userRole)) {
        throw new AppError(httpCode.UNAUTHORIZED, "You are not authorized");
      }

      req.user = decoded as IAuthData;

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
