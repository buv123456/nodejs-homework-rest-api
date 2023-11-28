const HttpError = require("../utils/helpers/HttpError");
const Contact = require("../models/Contact");
const getIds = require("../utils/helpers/getIds");

const getAllService = async (req) => {
  const { id } = req.user;
  const { page = 1, limit = 10, ...filters } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner: id, ...filters },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");
  return contacts;
};

const getByIdService = async (req) => {
  const { _id, owner } = getIds(req);
  const contact = await Contact.findOne(
    { _id, owner },
    "-updatedAt -createdAt"
  ).populate("owner", "email");
  if (!contact) {
    throw new HttpError(404, `Contact with id:${_id} not found`);
  }
  return contact;
};

const addService = async (req) => {
  const { owner } = getIds(req);
  const contact = await Contact.create({ ...req.body, owner });
  return contact;
};

const removeService = async (req) => {
  const { _id, owner } = getIds(req);
  const result = await Contact.findOneAndDelete({ _id, owner });
  if (!result) {
    throw new HttpError(404, `Contact with id:${_id} not found`);
  }
};

const updateService = async (req) => {
  const { _id, owner } = getIds(req);
  const contact = await Contact.findOneAndUpdate({ _id, owner }, req.body);
  if (!contact) {
    throw new HttpError(404, `Contact with id:${_id} not found`);
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
