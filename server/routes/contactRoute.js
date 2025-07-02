import express from 'express';
import { submitContact } from '../controllers/contactController.js';
const contactRouter = express.Router();

contactRouter.post('/send', submitContact);



export default contactRouter;