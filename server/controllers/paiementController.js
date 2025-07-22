import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/async.js';
import Paiement from '../models/paiementModel.js';
import userModel from '../models/userModel.js';
import Commande from '../models/commandeModel.js';
import generatePdf from '../utils/generatePdf.js';
import fs from 'fs';

// 📋 Obtenir tous les paiements pour un client
export const getPayments = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const payments = await Payment.find({ client: client._id }).sort('-paymentDate');

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments,
  });
});

// 📊 Obtenir le résumé des paiements
export const getPaymentSummary = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const totalPayments = await Payment.countDocuments({ client: client._id });
  const paidPayments = await Payment.countDocuments({
    client: client._id,
    status: 'paid',
  });
  const pendingPayments = await Payment.countDocuments({
    client: client._id,
    status: 'pending',
  });

  // Obtenir le solde actuel (somme de tous les paiements payés)
  const result = await Payment.aggregate([
    {
      $match: {
        client: client._id,
        status: 'paid',
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

  res.status(200).json({
    success: true,
    data: {
      totalPayments,
      paidPayments,
      pendingPayments,
      totalAmount,
    },
  });
});

// 📈 Obtenir les statistiques de paiement
export const getPaymentStats = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  // Paiements des 6 derniers mois
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const payments = await Payment.aggregate([
    {
      $match: {
        client: client._id,
        paymentDate: { $gte: sixMonthsAgo },
        status: 'paid',
      },
    },
    {
      $group: {
        _id: { $month: '$paymentDate' },
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id': 1 },
    },
  ]);

  // Formatage pour le graphique
  const monthNames = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
  ];

  const formattedData = monthNames.map((name, index) => {
    const monthData = payments.find(p => p._id === index + 1);
    return {
      name,
      amount: monthData ? monthData.totalAmount : 0,
      count: monthData ? monthData.count : 0,
    };
  }).slice(0, 6); // Seulement les 6 derniers mois

  res.status(200).json({
    success: true,
    data: formattedData,
  });
});

// 🧾 Générer une facture de paiement
export const generateInvoice = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const payment = await Payment.findOne({
    _id: req.params.id,
    client: client._id,
  }).populate('order');

  if (!payment) {
    return next(
      new ErrorResponse(`Paiement non trouvé avec l'id ${req.params.id}`, 404)
    );
  }

  // Générer la facture PDF
  const invoicePath = await generatePdf.generateInvoice(payment, client);

  res.download(invoicePath, `Facture-${payment.paymentNumber}.pdf`, (err) => {
    if (err) {
      console.error('Erreur lors du téléchargement:', err);
    }
    // Supprimer le fichier après téléchargement
    fs.unlink(invoicePath, (err) => {
      if (err) console.error('Erreur lors de la suppression du fichier:', err);
    });
  });
});