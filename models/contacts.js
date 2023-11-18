const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(allContacts);
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.find((item) => item.id === contactId) || null;
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;

  contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return true;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);

  if (!contactById) {
    return null;
  }

  Object.keys(body).forEach((key) => {
    contactById[key] = body[key];
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return contactById;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
