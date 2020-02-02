import Joi from 'joi';
import validateSchema from '../helpers/validateSchema';


export const validateCreatePensioner = (pensioner) => {
    const schema = {
        fullname: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        email: Joi.string().trim().lowercase().min(5)
            .max(255)
            .email()
            .required(),
        address: Joi.string().trim().min(5).max(255)
            .required(),

        city: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        phone: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        dob: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        gender: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        acctNum: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        bank: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        nextOfKinName: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
        nextOfKinPhone: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required(),
    };
    return validateSchema(pensioner, schema);
};
export const validateUpdatePensioner = (pensioner) => {
    const schema = {
        fullname: Joi.string().trim().lowercase().min(2)
            .max(100),
        email: Joi.string().trim().lowercase().min(5)
            .max(255)
            .email(),
        address: Joi.string().trim().min(5).max(255),

        city: Joi.string().trim().lowercase().min(2)
            .max(100),
        phone: Joi.string().trim().lowercase().min(2)
            .max(100),
        dob: Joi.string().trim().lowercase().min(2)
            .max(100),
        gender: Joi.string().trim().lowercase().min(2)
            .max(100),
        acctNum: Joi.string().trim().lowercase().min(2)
            .max(100),
        bank: Joi.string().trim().lowercase().min(2)
            .max(100),
        nextOfKinName: Joi.string().trim().lowercase().min(2)
            .max(100),
        nextOfKinPhone: Joi.string().trim().lowercase().min(2)
            .max(100),
    };
    return validateSchema(pensioner, schema);
};

export const validatePayment = (payment) => {
    const schema = {
        amount: Joi.string().trim().lowercase().min(2)
            .max(100)
            .required()
    };
    return validateSchema(payment, schema);
};