import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.config";
import { User as IUser } from "../common/interfaces/user.interface";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
        status: 401,
      });
    }

    const decodedToken = jwt.verify(token, config.accessTokenSecret as string);
    if (typeof decodedToken === "string" || !decodedToken?._id) {
      return res.status(401).json({
        message: "Unauthorized request",
        status: 401,
      });
    }

    const userId = decodedToken._id;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized request",
        status: 401,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized request",
      status: 401,
    });
  }
};

export default authenticate;
