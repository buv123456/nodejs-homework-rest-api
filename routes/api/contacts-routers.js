const express = require("express");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validator");
const controllers = require("../../controllers/contact-controller");
const contactSchemas = require("../../utils/helpers/contactValidationSchemas");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter
  .route("/")
  .get(controllers.getAll)
  .post(
    upload.single("avatarURL"),
    isEmptyBody,
    validateBody(contactSchemas.newContact),
    controllers.add
  );

contactsRouter
  .route("/:contactId")
  .get(isValidId, controllers.getById)
  .delete(isValidId, controllers.remove)
  .put(
    upload.single("avatarURL"),
    isValidId,
    isEmptyBody,
    validateBody(contactSchemas.updateContact),
    controllers.update
  );

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactSchemas.updateFavorite),
  controllers.update
);

module.exports = contactsRouter;
