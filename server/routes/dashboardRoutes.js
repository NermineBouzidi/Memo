const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentOrders,
  getRecentDocuments,
  getRecentPayments,
  getActivities
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, getDashboardStats);
router.get('/orders', protect, getRecentOrders);
router.get('/documents', protect, getRecentDocuments);
router.get('/payments', protect, getRecentPayments);
router.get('/activities', protect, getActivities);

module.exports = router;