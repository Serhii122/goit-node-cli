import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((element) => element.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((element) => element.id === contactId);
  if (index === -1) return null;

  const removeContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact[0];
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}