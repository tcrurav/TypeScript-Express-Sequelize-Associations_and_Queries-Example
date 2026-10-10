import express from "express";

import apiRouter from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

app.use("/api", apiRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);