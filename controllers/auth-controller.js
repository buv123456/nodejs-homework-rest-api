const controllerWrapper = require("../utils/decorators/controller-wrapper");
const services = require("../services/user-services");

const registerUser = controllerWrapper(async (req, res) => {
  const contact = await services.registerService(req.body);
  res.status(201).json(contact);
});

const loginUser = controllerWrapper(async (req, res) => {
  const result = await services.loginService(req.body);
  res.status(201).json(result);
});

const logoutUser = controllerWrapper(async (req, res) => {
  await services.logoutService(req.user._id);
  res.status(204).json({ message: "Logout success. No content" });
});

const currentUser = controllerWrapper((req, res) =>
  res.json({ email: req.user.email, subscription: req.user.subscription })
);

const updateUser = controllerWrapper(async (req, res) => {
  const result = await services.updateService(req.user._id, req.body);
  res.json(result);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
};
