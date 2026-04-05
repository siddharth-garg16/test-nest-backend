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
 * components:
 *   schemas:
 *     SignupResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Registered successfully."
 *         id:
 *           type: string
 *           example: "64abc123"
 *         status:
 *           type: integer
 *           example: 201
 */
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
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/signup").post(validateSchema(signupSchema), signupUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         message:
 *           type: string
 *           example: "User logged in successfully."
 *         user:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: "Jane"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             emailId:
 *               type: string
 *               format: email
 *               example: "jane@example.com"
 *             userType:
 *               type: string
 *               enum: [ADMIN, TEACHER, STUDENT]
 *               example: "TEACHER"
 */
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
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         headers:
 *           Set-Cookie:
 *             description: Sets accessToken and refreshToken cookies
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         headers:
 *           Set-Cookie:
 *             description: Clears accessToken and refreshToken cookies
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully."
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

export default router;
