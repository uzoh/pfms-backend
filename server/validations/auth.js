import Joi from 'joi';
import validateSchema from '../helpers/validateschema';

export const validateLogin = (user) => {
    const schema = {
        email: Joi.string().trim().lowercase().min(5)
            .max(255)
            .email()
            .required(),
        password: Joi.string().trim().min(5).max(255)
            .required()
    };

    return validateSchema(user, schema);
};

export const validateSignup = (user) => {
    const schema = {
        fullname: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        email: Joi.string().trim().lowercase().min(5)
            .max(255)
            .email()
            .required(),
        password: Joi.string().trim().min(5).max(255)
            .required()
    };

    return validateSchema(user, schema);
};
