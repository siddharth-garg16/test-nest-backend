import { NextFunction, Request, Response } from "express";
import { UserType } from "../common/enums/user-type.enum";

// middleware factory: returns a middlewre as a callback
const authorizeRoleAccess = (...allowedRoles: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // if no user found on req object (enforces that auth middleware must run before role auth middleware)
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized request",
        status: 401,
      });
    }
    if (!allowedRoles.includes(req.user?.userType)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Access denied", status: 403 });
    }
    next();
  };
};

export default authorizeRoleAccess;
