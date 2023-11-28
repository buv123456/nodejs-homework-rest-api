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

module.exports = {
  registerUser,
  loginUser,
};
