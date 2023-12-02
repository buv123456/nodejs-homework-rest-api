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

const updateUserStatusSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

// const updateUserAvatarSchema = Joi.object({
//   avatarURL: Joi.any()
//     .meta({ swaggerType: "file" })
//     .required()
//     .messages({ "any.required": "missing required file" }),
// });

module.exports = {
  register: userRegisterSchema,
  login: userLoginSchema,
  updateStatus: updateUserStatusSchema,
  // updateAvatar: updateUserAvatarSchema,
};
