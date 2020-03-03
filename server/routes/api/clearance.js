import express from "express";
import ClearanceController from "@controllers/ClearanceController";
import Token from "@middlewares/Token";

const clearanceRouter = express.Router();

clearanceRouter.post("/", ClearanceController.create);

export default clearanceRouter;
