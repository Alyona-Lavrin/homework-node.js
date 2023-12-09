// Розкоментуйте і запиши значення
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const findIdx = contacts.findIndex((item) => item.id === contactId);
    if (findIdx === -1) {
      return null;
    }
    const deletedContact = contacts.filter((_, index) => index !== findIdx);

    await fs.writeFile(contactsPath, JSON.stringify(deletedContact));
    return contacts[findIdx];
  } catch (error) {
    return error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: v4(), name, email, phone };
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};