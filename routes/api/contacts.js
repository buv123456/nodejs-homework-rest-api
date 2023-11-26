const express = require("express");
const isEmptyBody = require("../../middleware/isEmptyBody");
const validateBody = require("../../decorators/validator");
const { newContact, updateContact } = require("../../helpers/validationSchema");
const {
  getAll,
  getById,
  add,
  remove,
  update,
} = require("../../controllers/contact-controller");

const router = express.Router();

router.get("/", getAll);

// router.get("/:contactId", getById);

// router.post("/", isEmptyBody, validateBody(newContact), add);

// router.delete("/:contactId", remove);

// router.put("/:contactId", isEmptyBody, validateBody(updateContact), update);

module.exports = router;
