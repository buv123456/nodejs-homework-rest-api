const HttpError = require("../helpers/HttpError");
const Contact = require("../models/Contact");

const getAllService = async () => await Contact.find();

const getByIdService = async (id) => {
  const contact = await Contact.findById(id, "-updatedAt -createdAt -_id");
  if (!contact) {
    throw new HttpError(404, `Contact with id:${id} not found`);
  }
  return contact;
};

const addService = async (body) => await Contact.create(body);

const removeService = async (id) => {
  if (!(await Contact.findByIdAndDelete(id))) {
    throw new HttpError(404, `Contact with id:${id} not found`);
  }
};

const updateService = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body);
  if (!contact) {
    throw new HttpError(404, `Contact with id:${id} not found`);
  }
  return contact;
};

module.exports = {
  getAllService,
  getByIdService,
  addService,
  removeService,
  updateService,
};
