import express from "express";
import authRouter from "./auth";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => res.status(200).send("Welcome to the PFMS API"));

apiRouter.use("/auth", authRouter)

export default apiRouter;