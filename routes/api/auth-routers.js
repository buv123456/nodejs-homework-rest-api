const express = require("express");
const upload = require("../../middlewares/upload");

const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../middlewares/validator");
const userSchemas = require("../../utils/helpers/userValidationSchemas");
const controllers = require("../../controllers/auth-controller");
const authenticate = require("../../middlewares/authenticate");
const isFileInReq = require("../../middlewares/is-file-in-req");

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

authRouter.get("/verify/:verificationToken", controllers.verify);

authRouter.post(
  "/verify/",
  isEmptyBody,
  validateBody(userSchemas.verifyEmail),
  controllers.resendVerify
);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userSchemas.updateStatus),
  controllers.updateUser
);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  isFileInReq,
  controllers.updateAvatar
);

module.exports = authRouter;
