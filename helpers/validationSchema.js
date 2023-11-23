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
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  newContact: newContactSchema,
  updateContact: updateContactSchema,
};
