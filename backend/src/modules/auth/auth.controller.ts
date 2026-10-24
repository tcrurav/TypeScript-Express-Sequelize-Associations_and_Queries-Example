import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {

	static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { username, password } = res.locals.authUser;
			if (!username || !password) {
				res.status(400).json({ message: "User and Password are required" });
				return;
			}

			const user = await AuthService.validateCredentials(username, password);
			if (!user) {
				res.status(401).json({ message: "Non valid credentials" });
				return;
			}

			const token = await AuthService.generateToken(user.id, String(user.role));

			res.status(200).json({ message: "Auth OK", token, tokenType: "Bearer", expiresIn: 3600 });
		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}

	static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { username, password } = res.locals.authUser;
			if (!username || !password) {
				res.status(400).json({ message: "User and Password are required" });
				return;
			}

			const user = await AuthService.register(username, password);

			const token = await AuthService.generateToken(user.id, String(user.role));

			res.status(200).json({ message: "Auth OK", token, tokenType: "Bearer", expiresIn: 3600 });
		} catch (error) {
			res.status(500).json({
				message: error,
			});
		}
	}

}