import express from "express";
const router = express.Router();
import {
    addContact, deleteContact, getContact, getContacts, updateContact
} from '../controllers/contactController.js';

router.route('/get-contact/:id').get(getContact);
router.route('/get-contacts').get(getContacts);
router.route('/add-contact').post(addContact);
router.route('/delete-contact').delete(deleteContact);
router.route('/update-contact').put(updateContact);

export default router;