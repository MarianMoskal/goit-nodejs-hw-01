const { readFile, writeFile } = require('fs').promises;
const { randomUUID } = require('crypto');
const path = require('path');
const { idValidator } = require('./helpers/idValidator');

const contactsPath = path.relative(__dirname, 'db/contacts.json');

async function listContacts() {
  const data = await readFile(contactsPath, 'utf-8');
  return  JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  idValidator(contacts, contactId);

  return contacts.find(el => el.id == contactId);
}

async function addContact(name, email, phone) {
  const rule = !name || !email || !phone;
  
    if (rule) {
        throw new Error('Please fill all fields to add a new contact!')
    }
  
  const contacts = await listContacts();
  const id = randomUUID();
  const newContact = JSON.stringify({ id, name, email, phone });
  const newContacts = contacts.concat(JSON.parse(newContact));
  await writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  
  idValidator(contacts, contactId);
    
  const filteredContacts = contacts.filter(el => el.id != contactId );
  await writeFile(contactsPath, JSON.stringify(filteredContacts))
  return filteredContacts;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}