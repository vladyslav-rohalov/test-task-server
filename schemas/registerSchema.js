const Joi = require("joi");

const passwordRegexp = /^(?=.*[a-zA-Z])(?=.*\d).+/;
const emailRexexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

const userRegisterSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .pattern(emailRexexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegexp)
    .required()
    .messages({ "any.required": "missing required password field" }),
});

module.exports = userRegisterSchema;
