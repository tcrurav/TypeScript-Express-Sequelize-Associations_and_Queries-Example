import { Request, Response, NextFunction } from "express";

export async function extractBasicAuthHeader(req: Request, res: Response, next: NextFunction): Promise<void> {
  const unauthorized = () => {
    res.setHeader("WWW-Authenticate", 'Basic realm="Bicycle API"');
    res.status(401).json({ message: "Non valid credentials" });
  };

  try {
    const token = req.headers.authorization;
    if (!token || token?.indexOf('Basic ') != 0) {
      unauthorized();
      return;
    }

    const base64Credentials = token?.split(' ')[1];
    const credentials = Buffer.from(String(base64Credentials), 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    res.locals.authUser = {
      username: username,
      password: password
    };

    next();
  } catch (error) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Bicycle API"');
    res.status(500).json({ message: error });
  }
}