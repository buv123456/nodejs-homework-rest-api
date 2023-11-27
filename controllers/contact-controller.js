const controllerWrapper = require("../decorators/controller-wrapper");

const {
  getAllService,
  getByIdService,
  addService,
  removeService,
  updateService,
} = require("../services/contactService");

const getAll = controllerWrapper(async (req, res) => {
  res.json(await getAllService());
});

const getById = controllerWrapper(async (req, res) => {
  const contactById = await getByIdService(req.params.contactId);
  res.json(contactById);
});

const add = controllerWrapper(async (req, res) => {
  const contact = await addService(req.body);
  res.status(201).json(contact);
});

const remove = controllerWrapper(async (req, res) => {
  await removeService(req.params.contactId);
  res.json({ message: "Contact deleted" });
});

const update = controllerWrapper(async (req, res) => {
  const contact = await updateService(req.params.contactId, req.body);
  res.json(contact);
});

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
