import contactModel from '../models/contactModel.js';

export const addContact = async (req, res) => {
    const { name, email, mobileNumber } = req.body;

    try {

        const contactExistsWithEmail = await contactModel.findOne({ email });

        if (contactExistsWithEmail)
            return res.status(409).send({ message: "Contact with this email already exists." });

        const contactExistsWithMobileNumber = await contactModel.findOne({ mobileNumber });

        if (contactExistsWithMobileNumber)
            return res.status(409).send({ message: "Contact with this mobile number already exists." })

        const contact = await contactModel.create({
            name,
            email,
            mobileNumber,
        })

        res.status(201).send({ message: "Contact Created", contact });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export const deleteContact = async (req, res) => {
    console.log(res);
    console.log(req.body.id);
    try {
        const contact = await contactModel.findByIdAndDelete(req.body.id);
        if (!contact)
            return res.status(404).send({ message: "Contact not found" });
        res.status(200).send({ message: "Contact Deleted" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export const updateContact = async (req, res) => {
    try {
        await contactModel.findOneAndUpdate({ _id: req.body.id }, {
            name: req.body.name,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber
        });
        res.status(200).send({ message: "Contact Updated" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find({});
        res.status(200).send({ contacts });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export const getContact = async (req, res) => {
    try {
        console.log(req.params.id);
        const contact = await contactModel.findById(req.params.id);
        res.status(200).send({ contact });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}
