import express from "express";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => res.status(200).send("Welcome to the PFMS API"));

export default apiRouter;