import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

export class InvalidImageError extends Error {}

const imagesDirectory = fileURLToPath(  new URL("../../public/images/", import.meta.url));

mkdirSync(imagesDirectory, { recursive: true });

export async function removeImage(filename: string | null) {
  if (!filename) return;
  try {
    await unlink(join(imagesDirectory, basename(filename)));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Failed to remove image", error);
    }
  }
}

const imageExtensions = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
]);

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, imagesDirectory);
    },
    filename: (_req, file, callback) => {
      callback(null, `${randomUUID()}${imageExtensions.get(file.mimetype)}`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (!imageExtensions.has(file.mimetype)) {
      callback(new InvalidImageError("Only image formats JPEG, PNG, WebP, GIF and AVIF are allowed"));
      return;
    }

    callback(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
