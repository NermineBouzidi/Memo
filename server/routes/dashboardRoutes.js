import express from 'express';
import { getClientDashboard } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', authMiddleware, getClientDashboard);

export default dashboardroutes;