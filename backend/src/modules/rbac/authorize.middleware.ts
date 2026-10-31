import { Request, Response, NextFunction } from "express";
import { RbacService } from "./rbac.service.js";

export const authorize = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId = res.locals.authUser.user.id;

    if (!userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }
    console.log("userId", userId)

    const user = await RbacService.getUserPermissions(userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const permissions = (user.roles ?? []).flatMap(role =>
      (role.permissions ?? []).map(permission => permission.name)
    );

    if (!permissions.includes(requiredPermission)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }

    next();
  };
};