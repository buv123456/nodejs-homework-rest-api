const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validator");

const userSchemas = require("../../utils/helpers/userValidationSchemas");
const controllers = require("../../controllers/auth-controller");

const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  validateBody(userSchemas.register),
  controllers.registerUser
);

router.post(
  "/login",
  isEmptyBody,
  validateBody(userSchemas.login),
  controllers.loginUser
);

module.exports = router;
