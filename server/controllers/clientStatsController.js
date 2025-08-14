// controllers/clientStatsController.js
import mongoose from 'mongoose';
import Devis from '../models/Devis.js';
import Demo from '../models/DemoModel.js';
import Invoice from '../models/Invoice.js';

export const getClientStats = async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Validate clientId
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    // Get all devis for this client
    const devis = await Devis.find({ userId: clientId });
    
    // Get all RDVs for this client (using email as identifier)
    const client = await User.findById(clientId).select('email');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    const rdvs = await Demo.find({ userEmail: client.email });
    
    // Get all invoices for this client
    const invoices = await Invoice.find({ clientId: clientId });

    // Calculate devis stats
    const devisStats = {
      total: devis.length,
      pending: devis.filter(d => d.status === 'pending').length,
      approved: devis.filter(d => d.status === 'approved').length,
      rejected: devis.filter(d => d.status === 'rejected').length,
      totalAmount: devis.reduce((sum, d) => sum + d.montant, 0),
      approvedAmount: devis
        .filter(d => d.status === 'approved')
        .reduce((sum, d) => sum + d.montant, 0)
    };

    // Calculate RDV stats
    const rdvStats = {
      total: rdvs.length,
      pending: rdvs.filter(r => r.status === 'pending').length,
      approved: rdvs.filter(r => r.status === 'approved').length,
      rejected: rdvs.filter(r => r.status === 'rejected').length,
      postponed: rdvs.filter(r => r.status === 'postponed').length,
      completed: rdvs.filter(r => r.status === 'completed').length
    };

    // Calculate payment stats
    const paymentStats = {
      totalInvoices: invoices.length,
      paidInvoices: invoices.filter(i => i.status === 'paid').length,
      pendingInvoices: invoices.filter(i => i.status === 'pending').length,
      overdueInvoices: invoices.filter(i => 
        i.status === 'pending' && 
        i.dueDate < new Date()
      ).length,
      totalAmount: invoices.reduce((sum, i) => sum + i.amount, 0),
      paidAmount: invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + i.amount, 0),
      outstandingAmount: invoices
        .filter(i => i.status === 'pending')
        .reduce((sum, i) => sum + i.amount, 0)
    };

    res.status(200).json({
      clientId,
      devis: devisStats,
      rdv: rdvStats,
      payments: paymentStats
    });

  } catch (err) {
    console.error('Error in getClientStats:', err);
    res.status(500).json({ 
      message: 'Failed to fetch client statistics',
      error: err.message 
    });
  }
};