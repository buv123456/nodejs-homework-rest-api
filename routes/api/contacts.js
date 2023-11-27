const express = require("express");
const isEmptyBody = require("../../middleware/isEmptyBody");
const isValidId = require("../../middleware/isValidId");
const validateBody = require("../../decorators/validator");

const {
  getAll,
  getById,
  add,
  remove,
  update,
} = require("../../controllers/contact-controller");
const {
  newContact,
  updateContact,
  updateFavorite,
} = require("../../helpers/validationSchemas");

const router = express.Router();

router.route("/").get(getAll).post(isEmptyBody, validateBody(newContact), add);

router
  .route("/:contactId")
  .get(isValidId, getById)
  .delete(isValidId, remove)
  .put(isValidId, isEmptyBody, validateBody(updateContact), update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavorite),
  update
);

module.exports = router;
