import express from "express";
import ClearanceController from "@controllers/ClearanceController";
import Token from "@middlewares/Token";

const clearanceRouter = express.Router();

clearanceRouter.post("/", ClearanceController.create);
clearanceRouter.get("/", Token.authorize, ClearanceController.getAllRequests);
clearanceRouter.post("/:pensionerID", Token.authorize, ClearanceController.approve);

export default clearanceRouter;
