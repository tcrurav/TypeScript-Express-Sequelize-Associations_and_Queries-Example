import {
  Request,
  Response,
  NextFunction,
} from "express";
import { MulterError } from "multer";
import { InvalidImageError } from "./upload-middleware.js";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof MulterError || error instanceof InvalidImageError) {
    res.status(error instanceof MulterError && error.code === "LIMIT_FILE_SIZE" ? 413 : 400).json({
      message: error.message,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
}
