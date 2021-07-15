
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../model/index')

class Controller {
    async listContactsCont(req, res) {
        const result = await listContacts()
        if (!result) {
            return res.status(400).json({ message: 'Not found' })
        }
        return res.status(200).json(result)
    }

    async getContactByIdCont(req, res) {
        const result = await getContactById(req.params.contactId)
        if (!result) {
            return res.status(400).json({ message: 'Not found' })
        }
        return res.status(200).json(result)
    }

    async postContact(req, res) {
        const data = await addContact(req.body)
        return res.status(201).json(data)
    }

    async deleteContact(req, res) {
        const data = await removeContact(req.params.contactId)
        if (!data) {
            return res.status(400).json({ message: 'Not found' })
        }
        return res.status(200).json({ message: 'contact delete' })
    }

    async patchContact(req, res) {
        const data = await updateContact(req.params.contactId, req.body)
        if (!data) {
            return res.status(400).json({ message: 'Not found' })
        }
        return res.status(200).json(data)
    }
}

module.exports = new Controller()
