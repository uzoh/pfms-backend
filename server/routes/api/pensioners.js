import express from "express";
import PensionerController from "@controllers/PensionerController";
import Token from "@middlewares/Token";

const pensionersRouter = express.Router();

pensionersRouter.post("/", Token.authorize, PensionerController.create);
pensionersRouter.get("/", Token.authorize, PensionerController.getall)
pensionersRouter.delete("/:pensionerID", Token.authorize, PensionerController.delete);
pensionersRouter.get("/:pensionerID", Token.authorize, PensionerController.getSpecificPensioner);
pensionersRouter.put("/:pensionerID", Token.authorize, PensionerController.updatePensioner);
pensionersRouter.post("/:pensionerID/pay", Token.authorize, PensionerController.pay);

export default pensionersRouter;