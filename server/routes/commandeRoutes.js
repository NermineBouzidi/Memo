import express from 'express';
import {
  getOrders,
  getOrder,
  getOrderSummary,
} from '../controllers/commandeController.js';
import { protect } from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.get('/summary', protect, getOrderSummary);

export default commanderoutes;