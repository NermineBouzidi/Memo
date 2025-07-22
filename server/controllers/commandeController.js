import asyncHandler from '../middlewares/async.js';


// 🛒 Obtenir toutes les commandes d'un client
export const getOrders = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const orders = await Order.find({ client: client._id })
    .sort('-createdAt')
    .populate({
      path: 'items.product',
      select: 'name image',
    });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

// 📦 Obtenir une commande spécifique
export const getOrder = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const order = await Order.findOne({
    _id: req.params.id,
    client: client._id,
  }).populate({
    path: 'items.product',
    select: 'name description image',
  });

  if (!order) {
    return next(
    );
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// 📊 Obtenir le résumé des statuts de commande
export const getOrderSummary = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const totalOrders = await Order.countDocuments({ client: client._id });
  const pendingOrders = await Order.countDocuments({
    client: client._id,
    status: { $in: ['pending', 'processing', 'shipped'] },
  });
  const deliveredOrders = await Order.countDocuments({
    client: client._id,
    status: 'delivered',
  });

  res.status(200).json({
    success: true,
    data: {
      totalOrders,
      pendingOrders,
      deliveredOrders,
    },
  });
});