import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import errorHandler from "./middlewares/error-handler.middleware";

const app: Express = express();

app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());

// health check route
app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server up and running.",
  });
});

// router related imports
import userRouter from "./routes/user.route";
app.use("/api/user", userRouter);

// gobal error handler middleware
app.use(errorHandler);

export { app };
