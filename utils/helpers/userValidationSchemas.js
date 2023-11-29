const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email" }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password" }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const userLoginSchema = Joi.object().keys({
  email: userRegisterSchema.extract("email"),
  password: userRegisterSchema.extract("password"),
});

const updateUserStatusSchema = Joi.object().keys({
  subscription: userRegisterSchema.extract("subscription").required(),
});

module.exports = {
  register: userRegisterSchema,
  login: userLoginSchema,
  updateStatus: updateUserStatusSchema,
};
