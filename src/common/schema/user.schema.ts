import { z } from "zod";
import { UserType } from "../enums/user-type.enum";

export const signupSchema = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    emailId: z.email(),
    password: z.string().min(6),
    userType: z.enum(UserType),
});
export type SignUpDto = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    emailId: z.email(),
    password: z.string(),
});
export type LoginDto = z.infer<typeof loginSchema>;
