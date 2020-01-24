import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Response from '@helpers/Response';
import models from '../models';

const { User } = models;

config();
const tokenSecret = process.env.SECRET || 'secret';
const tokenExpiration = process.env.TOKEN_EXPIRE || '1d';

class Token {
    static async authorize(req, res, next) {
        try {
            const token = await Token.getToken(req);
            if (token) {
                const decoded = jwt.verify(token, tokenSecret);
                const user = await User.findOne({ where: { id: decoded.id } });
                if (user) {
                    req.user = user;
                    return next();

                }
            }
            return Response.error(res, 401, 'Unauthorized Access');

        } catch (error) {
            return Response.error(res, 401, 'Unauthorized Access');
        }
    }

    static getToken(req) {
        const bearerToken = req.headers.authorization;
        const token = bearerToken !== undefined && bearerToken.startsWith('Bearer ') && bearerToken.replace('Bearer ', '');

        return token;
    }

    static async create(payload) {
        const token = await jwt.sign(payload, tokenSecret, {
            expiresIn: tokenExpiration
        });
        return token;
    }

}
export default Token;