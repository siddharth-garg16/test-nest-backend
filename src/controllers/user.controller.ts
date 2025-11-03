import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (e) {
    throw new Error("Failed to process request");
  }
};

// route: '/signup'
const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, emailId, password, userType } = req.body;
};

// route: '/login'
const loginUser = async (req: Request, res: Response, next: NextFunction) => {};

// route: '/logout'
const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// route: '/refresh-token'
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { signupUser, loginUser, logoutUser, refreshToken };
