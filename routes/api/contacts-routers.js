const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validator");

const ctrl = require("../../controllers/contact-controller");
const {
  newContact,
  updateContact,
  updateFavorite,
} = require("../../utils/helpers/contactValidationSchemas");
const authenticate = require("../../middlewares/authenticate");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);
contactsRouter
  .route("/")
  .get(ctrl.getAll)
  .post(isEmptyBody, validateBody(newContact), ctrl.add);

contactsRouter
  .route("/:contactId")
  .get(isValidId, ctrl.getById)
  .delete(isValidId, ctrl.remove)
  .put(isValidId, isEmptyBody, validateBody(updateContact), ctrl.update);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavorite),
  ctrl.update
);

module.exports = contactsRouter;
