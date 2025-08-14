import express from 'express';
import { getAllClients, updateClientStatus, updateClientAmount } from '../controllers/client.controller.js';
const router = express.Router();
router.get('/', getAllClients);
router.put('/:id/status', updateClientStatus);
router.put('/:id/amount', updateClientAmount);
export default router;
