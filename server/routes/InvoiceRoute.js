import express from 'express';
import { getClientInvoices, downloadInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/client-invoices/:clientId', getClientInvoices);
router.get('/download/:id', downloadInvoice);

export default router;