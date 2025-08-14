// routes/devis.routes.js
import express from 'express';
import { createDevis, getDevis , deleteDevis,getClientDevis,downloadDevisPdf,statDevis,updateDevisStatus,getAcceptedDevis,generateInvoice,sendEmail,downloadFacture
    
 } from '../controllers/devisController.js';
import { parser } from '../config/cloudinary.config.js';

const router = express.Router();

router.post('/postdevis', parser.single('pdf'), createDevis);
router.get('/getdevis', getDevis);
router.delete('/deletedevis/:id', deleteDevis);
router.get('/client-devis/:userId', getClientDevis);
router.get('/download-devis/:id', downloadDevisPdf);
router.get('/stats',statDevis);
router.patch('/update-status/:id', updateDevisStatus);

router.get('/accepted-devis', getAcceptedDevis);
router.post('/generate-invoice/:devisId', generateInvoice);
router.post('/send-invoice-email/:id', sendEmail);
router.get('/download-facture/:id', downloadFacture);






export default router;