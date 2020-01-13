import { validateSignup, validateLogin } from "@validations/auth";
import { validateUniqueResponse, validationResponse } from "@helpers/validationResponse";
import models from "@models"
import { config } from 'dotenv';
import jwt from "jsonwebtoken"
import Response from "@helpers/Response"
import bcrypt from "bcrypt"

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

            return Response.success(res, 201, { user, token }, "The user has been created successfully");

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

    static async login(req, res, next) {
        try {
            const userDetails = await validateLogin(req.body);
            const user = await User.findOne({ where: { email: userDetails.email } });
            if (!user) { return Response.error(res, 400, "Email or Password is not correct") };
            const match = await bcrypt.compare(userDetails.password, user.password);
            if (!match) { return Response.error(res, 400, "Email or Password is not correct") };

            const payload = {
                id: user.id,
                email: user.email
            };
            const token = await jwt.sign(payload, tokenSecret, {
                expiresIn: tokenExpiration
            });

            return Response.success(res, 200, { user, token }, "You have been logged in successfully");

        } catch (err) {
            if (err.isJoi && err.name === 'ValidationError') {
                return res.status(400).json({
                    status: 400,
                    errors: validationResponse(err)
                });
            }
            next(err);
        }

    }
}

export default UserController;
