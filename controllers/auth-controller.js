const controllerWrapper = require("../utils/decorators/controller-wrapper");
const services = require("../services/user-services");

const registerUser = controllerWrapper(async (req, res) => {
  res.status(201).json(await services.registerService(req));
});

const loginUser = controllerWrapper(async (req, res) => {
  res.status(201).json(await services.loginService(req.body));
});

const logoutUser = controllerWrapper(async (req, res) => {
  await services.logoutService(req.user._id);
  res.status(204).json({ message: "Logout success. No content" });
});

const currentUser = controllerWrapper((req, res) =>
  res.json({ email: req.user.email, subscription: req.user.subscription })
);

const updateUser = controllerWrapper(async (req, res) => {
  res.json(await services.updateService(req.user._id, req.body, req.file));
});

const updateAvatar = controllerWrapper(async (req, res) => {
  res.json(await services.updateAvatar(req.user._id, req.body, req.file));
});

const verify = controllerWrapper(async (req, res) => {
  res.json(await services.verifyUser(req.param));
});

const resendVerify = controllerWrapper(async (req, res) => {
  res.json(await services.resendVerify(req.body.email));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
  updateAvatar,
  verify,
  resendVerify,
};
