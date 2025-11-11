import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  signupUser,
} from "../controllers/user.controller";
import authenticate from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticate, logoutUser);
router.route("/refresh-token").post(refreshToken);

export default router;
