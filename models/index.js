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
  return contacts.find((item) => item.id === contactId) || null;
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

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((i) => i.id === contactId);
  if (idx === -1) return null;

  contacts[idx] = { ...contacts[idx], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
