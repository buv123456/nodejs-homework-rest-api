const express = require("express");
const contactsDb = require("../../models/contacts");
const schema = require("../../helpers/validationSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const allContacts = await contactsDb.listContacts();
  res.status(200).json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactById = await contactsDb.getContactById(req.params.contactId);
  contactById
    ? res.status(200).json(contactById)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { error, value } = schema.newContact.validate(req.body);
  error
    ? res.status(400).json({ message: error.message })
    : res.status(201).json(await contactsDb.addContact(value));
});

router.delete("/:contactId", async (req, res, next) => {
  const isDeleted = await contactsDb.removeContact(req.params.contactId);
  isDeleted
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error, value } = schema.updateContact.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    const contact = await contactsDb.updateContact(req.params.contactId, value);
    contact
      ? res.status(200).json(contact)
      : res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
