const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveError, preUpdate } = require("./hooks");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", preUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

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
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  newContact: newContactSchema,
  updateContact: updateContactSchema,
  updateFavorite: updateContactFavoriteSchema,
};
