import { z } from "zod";
import { UserType } from "../enums/user-type.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - emailId
 *         - password
 *         - userType
 *       properties:
 *         firstName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Jane"
 *         lastName:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "Doe"
 *         emailId:
 *           type: string
 *           format: email
 *           example: "jane@example.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           example: "StrongPass@123"
 *         userType:
 *           type: string
 *           enum: [ADMIN, TEACHER, STUDENT]
 *           example: "STUDENT"
 */
export const signupSchema = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100).optional(),
    emailId: z.email(),
    password: z.string().min(8).max(50),
    userType: z.enum(UserType),
});
export type SignUpDto = z.infer<typeof signupSchema>;

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           format: email
 *           example: "jane@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "StrongPass@123"
 */
export const loginSchema = z.object({
    emailId: z.email(),
    password: z.string(),
});
export type LoginDto = z.infer<typeof loginSchema>;
