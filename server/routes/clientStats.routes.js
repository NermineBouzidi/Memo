// routes/clientStats.routes.js
import express from 'express';
import { getClientStats } from '../controllers/clientStatsController.js';

const router = express.Router();

router.get('/:clientId', getClientStats);

export default router;