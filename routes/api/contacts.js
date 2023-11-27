const express = require("express");
const isEmptyBody = require("../../middleware/isEmptyBody");
const isValidId = require("../../middleware/isValidId");
const validateBody = require("../../decorators/validator");
const {
  newContact,
  updateContact,
  updateFavorite,
} = require("../../models/Contact");
const {
  getAll,
  getById,
  add,
  remove,
  update,
} = require("../../controllers/contact-controller");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", isEmptyBody, validateBody(newContact), add);

router.delete("/:contactId", isValidId, remove);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(updateContact),
  update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavorite),
  update
);

module.exports = router;
