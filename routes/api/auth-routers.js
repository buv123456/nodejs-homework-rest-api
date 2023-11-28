const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../middlewares/validator");

const userSchemas = require("../../utils/helpers/userValidationSchemas");
const controllers = require("../../controllers/auth-controller");
const authenticate = require("../../middlewares/authenticate");

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSchemas.register),
  controllers.registerUser
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSchemas.login),
  controllers.loginUser
);

authRouter.post("/logout", authenticate, controllers.logoutUser);

authRouter.get("/current", authenticate, controllers.currentUser);

module.exports = authRouter;
