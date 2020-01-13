import express from "express";
import UserController from "@controllers/UserController";

const authRouter = express.Router();

authRouter.post("/register", UserController.create);

export default authRouter;