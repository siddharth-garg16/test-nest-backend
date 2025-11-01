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
const signupUser = () => {};

// route: '/login'
const loginUser = () => {};

// route: '/logout'
const logoutUser = () => {};

// route: '/refresh-token'
const refreshToken = () => {};

export { signupUser, loginUser, logoutUser, refreshToken };
