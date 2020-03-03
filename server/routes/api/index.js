import express from "express";
import authRouter from "./auth";
import pensionerRouter from "./pensioners";
import clearanceRouter from "./clearance";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => res.status(200).send("Welcome to the PFMS API"));

apiRouter.use("/auth", authRouter)
apiRouter.use("/pensioners", pensionerRouter)
apiRouter.use("/clearance", clearanceRouter )


export default apiRouter;