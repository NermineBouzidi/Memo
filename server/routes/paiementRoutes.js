import express from 'express';
import {
  getPayments,
  getPaymentSummary,
  getPaymentStats,
  generateInvoice,
} from '../controllers/paiementController.js';
import { protect } from '../middleware/userAuth.js'

const router = express.Router();

router.get('/', protect, getPayments);
router.get('/summary', protect, getPaymentSummary);
router.get('/stats', protect, getPaymentStats);
router.get('/:id/invoice', protect, generateInvoice);

export default paiementroutes;