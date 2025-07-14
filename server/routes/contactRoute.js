import express from 'express';
import { submitContact ,updateContact ,deleteContact , getAllContacts ,getContactById ,replyToContact} from '../controllers/contactController.js';
const contactRouter = express.Router();

contactRouter.post('/send', submitContact);
contactRouter.put('/update/:id', updateContact); // Assuming you want to update the contact message
contactRouter.delete('/delete/:id', deleteContact); // Assuming you want to delete the contact message
contactRouter.get('/get-all', getAllContacts); // Assuming you want to get all contact messages
contactRouter.get('/get-contact-by-id/:id',getContactById); // Assuming you want to get a contact message by ID
contactRouter.put('/reply/:id', replyToContact);

export default contactRouter;