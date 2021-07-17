// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../model/index");

const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");

const Contact = require("./mongoose.js");

class Controller {
  async listContactsCont(req, res) {
    const result = await Contact.find({});
    console.log(result);
    if (!result) {
      return res.status(400).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  }

  async getContactByIdCont(req, res) {
    const {
      params: { contactId },
    } = req;
    const result = await Contact.findById(contactId);
    if (!result) {
      return res.status(400).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  }

  async postContactCont(req, res) {
    const data = await Contact.create(req.body);
    return res.status(201).json(data);
  }

  async deleteContactCont(req, res) {
    const {
      params: { contactId },
    } = req;
    const data = await Contact.findByIdAndDelete(contactId);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "contact delete" });
  }

  async patchContactCont(req, res) {
    const {
      params: { contactId },
    } = req;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(data);
  }

  async patchFavoriteCont(req, res) {
    const {
      params: { contactId },
    } = req;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    return res.status(200).json(data);
  }
}

module.exports = new Controller();
