import { Router } from "express";
import {
    loginUser,
    logoutUser,
    refreshToken,
    signupUser,
} from "../controllers/user.controller";
import authenticate from "../middlewares/auth.middleware";
import validateSchema from "../middlewares/schema-validator.middleware";
import { signupSchema, loginSchema } from "../common/schema/user.schema";

const router = Router();

router.route("/signup").post(validateSchema(signupSchema), signupUser);
router.route("/login").post(validateSchema(loginSchema), loginUser);
router.route("/logout").post(authenticate, logoutUser);
router.route("/refresh-token").post(refreshToken);

export default router;
