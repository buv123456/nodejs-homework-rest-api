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
}).required();

const updateContactSchema = Joi.object({
  name: Joi.optional(),
  email: Joi.optional(),
  phone: Joi.optional(),
}).required();

module.exports = {
  newContact: newContactSchema,
  updateContact: updateContactSchema,
};
