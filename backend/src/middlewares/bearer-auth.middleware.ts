import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/auth/user.model.js";

export async function bearerAuth(req: Request, res: Response, next: NextFunction): Promise<void> {

    const authorization = req.headers.authorization;
    if (!authorization || authorization.indexOf("Bearer ") != 0) {
        res.status(401).json({ message: "Token Bearer required" });
        return;
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        next(new Error("JWT_SECRET not configured"));
        return;
    }

    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: ["HS256"],
            issuer: "bicycle-shop-api",
            audience: "bicycle-shop-client"
        }
        );

        if (typeof decoded === "string" || !decoded.sub) {
            res.status(401).json({ message: "Token not valid" });
            return;
        }

        const payload = decoded as JwtPayload;
        const user = await User.findByPk(payload.sub);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        // anything inside locals allows to share info between controllers and middlewares
        res.locals.authUser = {
            user
        };

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }
        next(error);
    }
}