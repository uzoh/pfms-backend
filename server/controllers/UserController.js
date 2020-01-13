import { validateSignup } from "@validations/auth";
import { validateUniqueResponse, validationResponse } from "@helpers/validationResponse";
import models from "@models"
import { config } from 'dotenv';
import jwt from "jsonwebtoken"

const { User } = models

config();
const tokenSecret = process.env.SECRET || 'secret';
const tokenExpiration = process.env.TOKEN_EXPIRE || '1d';

class UserController {
    static async create(req, res, next) {
        try {
            const userDetails = await validateSignup(req.body);
            const user = await User.create(userDetails);

            const payload = {
                id: user.id,
                email: user.email
            };
            const token = await jwt.sign(payload, tokenSecret, {
                expiresIn: tokenExpiration
            });

            return res.status(200).json({
                user, token
            });

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

export default UserController;
