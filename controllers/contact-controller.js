const controllerWrapper = require("../utils/decorators/controller-wrapper");
const services = require("../services/contactService");

const getAll = controllerWrapper(async (req, res) => {
  res.json(await services.getAllService());
});

const getById = controllerWrapper(async (req, res) => {
  const contactById = await services.getByIdService(req.params.contactId);
  res.json(contactById);
});

const add = controllerWrapper(async (req, res) => {
  const contact = await services.addService(req.body);
  res.status(201).json(contact);
});

const remove = controllerWrapper(async (req, res) => {
  await services.removeService(req.params.contactId);
  res.json({ message: "Contact deleted" });
});

const update = controllerWrapper(async (req, res) => {
  const contact = await services.updateService(req.params.contactId, req.body);
  res.json(contact);
});

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
