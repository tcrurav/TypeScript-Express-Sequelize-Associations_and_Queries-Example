import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ?? "development";

if (!["development", "test", "production"].includes(NODE_ENV)) {
  throw new Error(`Invalid environment: ${NODE_ENV}`);
}

if (NODE_ENV !== "production") {
  dotenv.config({
    path: `.env.${NODE_ENV}`,
  });
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  JWT_SECRET: process.env.JWT_SECRET || "A_VERY_LARGE_AND_SECRET_KEY",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",

  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || "dsw_products",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  NODE_ENV
};