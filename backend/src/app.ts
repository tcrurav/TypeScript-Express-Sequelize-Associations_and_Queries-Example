import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";

import apiRouter from "./routes/index.js";
import webRouter from "./routes/web.js";

import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set(
  "views",
  fileURLToPath(new URL("./views/", import.meta.url))
);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/images", express.static(fileURLToPath(new URL("../public/images/", import.meta.url))));

app.get("/", (req, res) => {
  res.json({
    message: "API working",
  });
});

app.use("/api", apiRouter);
app.use("/", webRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
