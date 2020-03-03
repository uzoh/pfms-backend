import Joi from "joi";
import validateSchema from "../helpers/validateschema";

export const validateClearance = clearance => {
  const schema = {
    email: Joi.string()
      .trim()
      .lowercase()
      .min(5)
      .max(255)
      .email()
      .required(),
    picture: Joi.string()
      .trim()
      .min(5)
      .uri()
      .required()
  };

  return validateSchema(clearance, schema);
};
