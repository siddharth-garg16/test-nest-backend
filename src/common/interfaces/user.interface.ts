import { UserType } from "../enums/user-type.enum";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  refreshToken?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  validatePassword: (candidatePassword: string) => Promise<boolean>;
}
