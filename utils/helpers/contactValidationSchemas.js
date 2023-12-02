const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone" }),
  favorite: Joi.boolean().default(false),
  avatarUrl: Joi.string(),
});

const updateContactSchema = Joi.object().keys({
  name: newContactSchema.extract("name").optional(),
  email: newContactSchema.extract("email").optional(),
  phone: newContactSchema.extract("phone").optional(),
  favorite: newContactSchema.extract("favorite").optional(),
});
//   .or("name", "email", "phone", "favorite");

const updateContactFavoriteSchema = Joi.object().keys({
  favorite: newContactSchema
    .extract("favorite")
    .required()
    .messages({ "any.required": "missing required favorite" }),
});

module.exports = {
  newContact: newContactSchema,
  updateContact: updateContactSchema,
  updateFavorite: updateContactFavoriteSchema,
};
