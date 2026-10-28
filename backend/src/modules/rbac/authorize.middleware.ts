import {
  Request,
  Response,
  NextFunction
} from "express";

export const authorize = (requiredPermission: string) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {

    const user = req.user;

    if (!user) {
      res.status(401).json({
        message: "Authentication required"
      });
      return;
    }

    if (!user.permissions.includes(requiredPermission)) {
      res.status(403).json({
        message: "Forbidden: insufficient permissions"
      });
      return;
    }

    next();
  };
};