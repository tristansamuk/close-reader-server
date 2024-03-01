import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Route Imports

// .env variables
const { PORT, CORS_ORIGIN } = process.env;

// Middleware

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Home Route

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes

import poetsRouter from "./routes/poets";
import poemsRouter from "./routes/poems";
import analysesRouter from "./routes/analyses";

app.use("/poets", poetsRouter);
app.use("/poems", poemsRouter);
app.use("/analyses", analysesRouter);

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
