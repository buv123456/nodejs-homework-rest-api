const controllerWrapper = require("../utils/decorators/controller-wrapper");
const services = require("../services/contact-services");

const getAll = controllerWrapper(async (req, res) => {
  res.json(await services.getAllService(req));
});

const getById = controllerWrapper(async (req, res) => {
  const contactById = await services.getByIdService(req);
  res.json(contactById);
});

const add = controllerWrapper(async (req, res) => {
  const contact = await services.addService(req);
  res.status(201).json(contact);
});

const remove = controllerWrapper(async (req, res) => {
  await services.removeService(req);
  res.json({ message: "Contact deleted" });
});

const update = controllerWrapper(async (req, res) => {
  const contact = await services.updateService(req);
  res.json(contact);
});

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
