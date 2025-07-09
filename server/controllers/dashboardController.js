const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Document = require('../models/Document');
const Payment = require('../models/Payment');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  
  // Get counts
  const ordersCount = await Order.countDocuments({ user: userId });
  const documentsCount = await Document.countDocuments({ user: userId });
  
  // Get total spending
  const payments = await Payment.find({ 
    user: userId,
    status: 'complet' 
  });
  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Get projects count (assuming 1 project per order)
  const projectsCount = ordersCount;
  
  res.status(200).json({
    success: true,
    data: {
      stats: [
        {
          title: "Vos dépenses clients",
          value: `${totalSpent.toLocaleString('fr-FR')} €`,
          change: "+12%",
          isPositive: true
        },
        {
          title: "Vos commandes clients",
          value: ordersCount,
          change: "+5%",
          isPositive: true
        },
        {
          title: "Factures clients",
          value: documentsCount,
          change: "-3%",
          isPositive: false
        },
        {
          title: "Projets clients",
          value: projectsCount,
          change: "+2%",
          isPositive: true
        }
      ],
      radialStats: [
        { label: "Taux de complétion", value: 78 },
        { label: "Satisfaction client", value: 92 },
        { label: "Livraison à temps", value: 85 }
      ]
    }
  });
});

// @desc    Get recent orders
// @route   GET /api/dashboard/orders
// @access  Private
exports.getRecentOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })
    .sort('-createdAt')
    .limit(3);
  
  const formattedOrders = orders.map(order => ({
    id: order.orderNumber,
    date: order.createdAt.toLocaleDateString('fr-FR'),
    status: order.status,
    amount: `${order.totalAmount} €`,
    items: order.items.reduce((sum, item) => sum + item.quantity, 0),
    statusComponent: getStatusComponent(order.status)
  }));
  
  res.status(200).json({
    success: true,
    data: formattedOrders
  });
});

// @desc    Get recent documents
// @route   GET /api/dashboard/documents
// @access  Private
exports.getRecentDocuments = asyncHandler(async (req, res, next) => {
  const documents = await Document.find({ user: req.user.id })
    .sort('-createdAt')
    .limit(3);
  
  const formattedDocuments = documents.map(doc => ({
    name: doc.name,
    date: doc.createdAt.toLocaleDateString('fr-FR'),
    size: formatFileSize(doc.size),
    type: doc.type === 'facture' ? 'Facture' : 'Contrat',
    id: doc.reference,
    time: doc.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }));
  
  res.status(200).json({
    success: true,
    data: formattedDocuments
  });
});

// @desc    Get recent payments
// @route   GET /api/dashboard/payments
// @access  Private
exports.getRecentPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({ user: req.user.id })
    .sort('-createdAt')
    .limit(3);
  
  const formattedPayments = payments.map(payment => ({
    ref: payment.reference,
    date: payment.createdAt.toLocaleDateString('fr-FR'),
    amount: `${payment.amount} €`,
    method: payment.method,
    status: payment.status === 'complet' ? 'Complet' : 'En attente'
  }));
  
  res.status(200).json({
    success: true,
    data: formattedPayments
  });
});

// @desc    Get recent activities
// @route   GET /api/dashboard/activities
// @access  Private
exports.getActivities = asyncHandler(async (req, res, next) => {
  // Get last orders, documents and payments
  const [orders, documents, payments] = await Promise.all([
    Order.find({ user: req.user.id }).sort('-createdAt').limit(1),
    Document.find({ user: req.user.id }).sort('-createdAt').limit(1),
    Payment.find({ user: req.user.id }).sort('-createdAt').limit(1)
  ]);
  
  const activities = [];
  
  if (orders.length > 0) {
    activities.push({
      type: "Commande",
      description: `Nouvelle commande ${orders[0].orderNumber}`,
      date: formatActivityDate(orders[0].createdAt)
    });
  }
  
  if (payments.length > 0) {
    activities.push({
      type: "Paiement",
      description: `Paiement reçu (${payments[0].amount} €)`,
      date: formatActivityDate(payments[0].createdAt)
    });
  }
  
  if (documents.length > 0) {
    activities.push({
      type: "Document",
      description: "Nouveau document disponible",
      date: formatActivityDate(documents[0].createdAt)
    });
  }
  
  res.status(200).json({
    success: true,
    data: activities
  });
});

// Helper functions
function getStatusComponent(status) {
  const statusMap = {
    'livré': { text: 'Livré', bg: 'bg-green-100', textColor: 'text-green-800', icon: 'CheckCircle' },
    'en cours': { text: 'En cours', bg: 'bg-yellow-100', textColor: 'text-yellow-800', icon: 'Clock' },
    'annulé': { text: 'Annulé', bg: 'bg-red-100', textColor: 'text-red-800', icon: 'XCircle' }
  };
  
  const statusInfo = statusMap[status] || statusMap['en cours'];
  
  return {
    text: statusInfo.text,
    bg: statusInfo.bg,
    textColor: statusInfo.textColor,
    icon: statusInfo.icon
  };
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} Bytes`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  else return `${(bytes / 1048576).toFixed(1)} MB`;
}

function formatActivityDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return `Aujourd'hui à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Hier à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString('fr-FR');
  }
}