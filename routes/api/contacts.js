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

const router = express.Router();

router
  .route("/")
  .get(ctrl.getAll)
  .post(isEmptyBody, validateBody(newContact), ctrl.add);

router
  .route("/:contactId")
  .get(isValidId, ctrl.getById)
  .delete(isValidId, ctrl.remove)
  .put(isValidId, isEmptyBody, validateBody(updateContact), ctrl.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavorite),
  ctrl.update
);

module.exports = router;
