import {
  validateUniqueResponse,
  validationResponse
} from "@helpers/validationResponse";
import models from "@models";
import Response from "@helpers/Response";
import { validateClearance } from "@validations/clearance";
import { sendClearanceReceived } from "@helpers/mailer";

const { Clearance, Pensioner, ClearedPensioner } = models;

class ClearanceController {
  static async create(req, res, next) {
    try {
      const clearanceDetails = await validateClearance(req.body);

      // get the current user
      const pensioner = await Pensioner.findOne({
        where: { email: clearanceDetails.email }
      });

      if (!pensioner)
        return Response.error(res, 404, "Pensioner does not exist");

      // check if the user has already been cleared
      const clearedPensioner = await ClearedPensioner.findOne({
        where: { pensionerID: pensioner.id }
      });

      if (clearedPensioner)
        return Response.error(
          res,
          403,
          "You have already been cleared for payment"
        );

      const clearance = await Clearance.findOrCreate({
        where: { pensionerID: pensioner.id },
        defaults: {
          pensionerID: pensioner.id,
          picture: clearanceDetails.picture
        }
      });

      sendClearanceReceived(pensioner.email, pensioner.fullname);
      Response.success(res, 200, clearance, "Clearance Submitted");
    } catch (err) {
      if (err.isJoi && err.name === "ValidationError") {
        return res.status(400).json({
          status: 400,
          errors: validationResponse(err)
        });
      }
      next(err);
    }
  }
}

export default ClearanceController;
