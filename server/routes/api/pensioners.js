import express from "express";
import PensionerController from "@controllers/PensionerController";
import Token from "@middlewares/Token";

const pensionersRouter = express.Router();

pensionersRouter.post("/", Token.authorize, PensionerController.create);
//pensionersRouter.delete("/", PensionerController.delete);

export default pensionersRouter;