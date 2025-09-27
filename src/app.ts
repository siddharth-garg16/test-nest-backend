import cookieParser from "cookie-parser";
import express, { Express } from "express";

const app: Express = express();

app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());

export { app };
