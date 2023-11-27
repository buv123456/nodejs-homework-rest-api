const HttpError = require("../helpers/HttpError");
const contactDecorator = require("../decorators/contact-decorator");
const { Contact } = require("../models/Contact");

const getAll = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const contactById = await Contact.findById(
    req.params.contactId,
    "-updatedAt -createdAt -_id"
  );
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

const add = async (req, res) => {
  res.status(201).json(await Contact.create(req.body));
};

const remove = async (req, res) => {
  const isDeleted = await Contact.findByIdAndDelete(req.params.contactId);
  if (!isDeleted) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getAll: contactDecorator(getAll),
  getById: contactDecorator(getById),
  add: contactDecorator(add),
  remove: contactDecorator(remove),
  update: contactDecorator(update),
};
