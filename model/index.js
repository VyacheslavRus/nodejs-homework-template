// let fs = require("fs").promises;

// const path = require("path");

// const contactsPath = path.join(__dirname, "./contacts.json");

// const listContacts = async () => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const result = JSON.parse(data);
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const result = JSON.parse(data);
//     const contact = result.find((contact) => contact.id === Number(contactId));
//     return contact;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const removeContact = async (contactId) => {
//   const remove = await fs.readFile(contactsPath, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   const data = JSON.parse(remove);
//   const findContact = data.find((contact) => contact.id === Number(contactId));
//   const filter = data.filter((contact) => contact.id !== Number(contactId));
//   const filterContact = JSON.stringify(filter);
//   fs.writeFile(contactsPath, filterContact, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   return findContact;
// };

// const addContact = async ({ name, email, phone }) => {
//   const result = await fs.readFile(contactsPath, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   const parseData = JSON.parse(result);
//   const newId = parseData.length + 1;
//   const contact = [{ id: newId, name, email, phone }];
//   const updated = [...parseData, ...contact];
//   const contactJson = JSON.stringify(updated);

//   fs.writeFile(contactsPath, contactJson, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   return contact;
// };

// const updateContact = async (contactId, bodyPart) => {
//   const contacts = await fs.readFile(contactsPath, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   const data = JSON.parse(contacts);
//   const findIndex = data.findIndex(
//     (contact) => contact.id === Number(contactId)
//   );
//   if (findIndex !== -1) {
//     data[findIndex] = {
//       ...data[findIndex],
//       ...bodyPart,
//     };
//     const dataContact = JSON.stringify(data);
//     fs.writeFile(contactsPath, dataContact, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//     return data[findIndex];
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
