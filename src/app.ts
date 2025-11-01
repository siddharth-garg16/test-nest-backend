import cookieParser from "cookie-parser";
import express, { Express } from "express";
import errorHandler from "./middlewares/error-handler.middleware";

const app: Express = express();

app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());

// router related imports
import userRouter from "./routes/user.route";
app.use("/api/user", userRouter);

// gobal error handler middleware
app.use(errorHandler);

export { app };
