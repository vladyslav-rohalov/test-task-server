const Joi = require("joi");

const emailRexexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRexexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
});

module.exports = loginSchema;
