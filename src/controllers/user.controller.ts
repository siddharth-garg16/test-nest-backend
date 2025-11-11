import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.config";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
};

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

  try {
    // check if the email is already in use
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      const existingEmailError = createHttpError(
        400,
        "Entered email is already in use."
      );
      return next(existingEmailError);
    }

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password,
      userType,
    });

    if (!newUser) {
      return next(
        createHttpError(500, "Something went wrong while signing up.")
      );
    }

    return res.status(201).json({
      message: "Registered successfully.",
      id: newUser._id,
      status: 201,
    });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong while signing up."));
  }
};

// route: '/login'
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { emailId, password } = req.body;
  // validate that the required fields are present in the request body
  const isMissingRequiredFields = [emailId, password].some(
    (val) => val?.trim() === ""
  );
  if (isMissingRequiredFields) {
    const missingFieldError = createHttpError(
      400,
      "Invalid Request: Please enter required fields."
    );
    return next(missingFieldError);
  }

  try {
    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      const invalidCredentials = createHttpError(404, "Invalid credentials.");
      return next(invalidCredentials);
    }

    // verify if the entered password is correct
    const isProvidedPasswordCorrect = await existingUser.validatePassword(
      password
    );
    if (!isProvidedPasswordCorrect) {
      const invalidCredentials = createHttpError(404, "Invalid credentials.");
      return next(invalidCredentials);
    }

    // generating access and refresh token for the newly logged in user
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existingUser._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json({
        status: 200,
        accessToken,
        refreshToken,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          emailId: existingUser.emailId,
          userType: existingUser.userType,
        },
      });
  } catch (err) {
    return next(createHttpError(500, "Something went wrong while logging in."));
  }
};

// route: '/logout'
const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: null, // refresh token to null
        },
      },
      {
        new: true, // returns updated doc after update
      }
    );

    return res
      .status(200)
      .clearCookie("accessToken", COOKIE_OPTIONS)
      .clearCookie("refreshToken", COOKIE_OPTIONS)
      .json({
        status: 200,
        message: "User logged out successfully.",
      });
  } catch {
    return next(
      createHttpError(500, "Something went wrong while logging out.")
    );
  }
};

// route: '/refresh-token'
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
  // if no token exists
  if (!incomingToken) {
    const missingTokenError = createHttpError(401, "Invalid credentials.");
    return next(missingTokenError);
  }

  try {
    const decodedToken = jwt.verify(
      incomingToken,
      config.refreshTokenSecret as string
    );
    // if the token is not a valid refreshToken
    if (typeof decodedToken === "string" || !decodedToken?._id) {
      const invalidTokenError = createHttpError(401, "Invalid credentials.");
      return next(invalidTokenError);
    }

    // find user in db
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(createHttpError(404, "User not found."));
    }
    // if the refresh token in the req doesn't match refresh token in db
    if (user.refreshToken !== incomingToken) {
      return next(createHttpError(403, "Invalid or expired refresh token."));
    }

    // generating tokens for the user
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .status(200)
      .json({
        status: 200,
        accessToken,
      });
  } catch (error) {
    return next(createHttpError(500, "Something went wrong."));
  }
};

export { signupUser, loginUser, logoutUser, refreshToken };
