import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import createHttpError from "http-errors";

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
  // validate that the required fields are present in the request body
  const isMissingRequiredFields = [firstName, emailId, password, userType].some(
    (val) => val?.trim() === ""
  );
  if (isMissingRequiredFields) {
    const missingFieldError = createHttpError(
      400,
      "Invalid Request: Please enter required fields."
    );
    return next(missingFieldError);
  }

  // check if the email is already in use
  try {
    const user = await User.findOne({ emailId });
    if (user) {
      const existingEmailError = createHttpError(
        400,
        "Entered email is already in use."
      );
      return next(existingEmailError);
    }
  } catch (error) {
    return next(createHttpError(500, "Something went wrong while signing up."));
  }

  const newUser = await User.create({
    firstName,
    lastName,
    emailId,
    password,
    userType,
  });

  if (!newUser) {
    return next(createHttpError(500, "Something went wrong while signing up."));
  }

  return res.status(201).json({
    message: "Registered successfully.",
    id: newUser._id,
    status: 201,
  });
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
