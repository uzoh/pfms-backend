import { validateUniqueResponse, validationResponse } from "@helpers/validationResponse";
import models from "@models"
import { config } from 'dotenv';
import jwt from "jsonwebtoken"
import Response from "@helpers/Response"
import bcrypt from "bcrypt"
import { validateCreatePensioner } from "@validations/pensioner";

const { Pensioner } = models

class PensionerController {
    static async create(req, res, next) {
        try {
            const pensionerDetails = await validateCreatePensioner(req.body);
            const pensioner = await Pensioner.create(pensionerDetails);

            Response.success(res, 200, pensioner);

        } catch (err) {
            if (err.isJoi && err.name === 'ValidationError') {
                return res.status(400).json({
                    status: 400,
                    errors: validationResponse(err)
                });
            }

            if (err.errors && err.errors[0].type === 'unique violation') {
                return res.status(400).json({
                    status: 400,
                    errors: validateUniqueResponse(err)
                });
            }
            next(err);
        }

    }
}
export default PensionerController;