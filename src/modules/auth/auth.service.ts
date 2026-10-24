import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export class AuthService {

  static async validateCredentials(
    username: string,
    password: string
  ): Promise<User | null> {

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      String(user.passwordHash)
    );

    if (!validPassword) {
      return null;
    }

    return user;
  }

  static async register(
    username: string,
    password: string
  ): Promise<User> {

    const existingUser = await User.findOne({
      where: { username }
    });

    if (existingUser) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    return User.create({
      username,
      passwordHash,
      role: "user"
    });
  }

  static async generateToken(userId: number, userRole: string): Promise<string | null> {
    const secret = env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({ role: userRole }, secret, {
      algorithm: "HS256",
      subject: String(userId),
      expiresIn: "1h",
      issuer: "bicycle-shop-api",
      audience: "bicycle-shop-client"
    });

    return token;
  }
}
