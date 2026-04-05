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

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 */
router.route("/signup").post(validateSchema(signupSchema), signupUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 */
router.route("/login").post(validateSchema(loginSchema), loginUser);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.route("/logout").post(authenticate, logoutUser);

/**
 * @swagger
 * /api/user/refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.route("/refresh-token").post(refreshToken);
router.route("/refresh-token").post(refreshToken);

export default router;
