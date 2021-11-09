const { readFile, writeFile } = require('fs').promises;
const {idGenerator} = require('./helpers/idGenerator')
const path = require('path');


const contactsPath = path.relative(__dirname, 'db/contacts.json');

async function listContacts () {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    return data;

  } catch (error) {
    console.error(error)
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFile(contactsPath, 'utf-8');
    const contact = JSON.parse(data).find(el => el.id == contactId);
    return contact;

  } catch (error) {
    console.error(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readFile(contactsPath, 'utf-8');
    const ids = JSON.parse(contacts).map(el => el.id);
    const id = idGenerator(ids);
    const newContact = JSON.stringify({ id, name, email, phone });
    const newContacts = JSON.parse(contacts).concat(JSON.parse(newContact));
    const setNewContacts = await writeFile(contactsPath, JSON.stringify(newContacts));
    const result = await readFile(contactsPath, 'utf-8');
    return result;
    
  } catch (error) {
    console.error(error)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFile(contactsPath, 'utf-8');
    const filteredContacts = JSON.parse(contacts).filter(el =>
      el.id != contactId );
    const setFilteredContacts = await writeFile(contactsPath,
      JSON.stringify(filteredContacts))
    const result = await readFile(contactsPath, 'utf-8');
    return result;

  } catch (error) {
    console.error(error)
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}