import { User as IUser } from "../../common/interfaces/user.interface";
declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, "password" | "refreshToken">;
    }
  }
}
