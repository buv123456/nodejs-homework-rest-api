const controllerWrapper = require("../utils/decorators/controller-wrapper");
const services = require("../services/user-services");

const registerUser = controllerWrapper(async (req, res) => {
  const contact = await services.registerService(req.body);
  res.status(201).json(contact);
});

const loginUser = controllerWrapper(async (req, res) => {
  const token = await services.loginService(req.body);
  res.status(201).json({ token });
});

const logoutUser = controllerWrapper(async (req, res) => {
  await services.logoutService(req.user._id);
  res.json({ message: "Signout success" });
});

const currentUser = controllerWrapper((req, res) =>
  res.json({ email: req.user.email })
);

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
};
