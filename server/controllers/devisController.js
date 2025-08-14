import Devis from '../models/Devis.js';
import mongoose from 'mongoose';
import axios from 'axios';
import Invoice from '../models/Invoice.js'; // You'll need to create this model
import {sendInvoiceEmail } from '../config/nodemailer.js';
import User from "../models/userModel.js";
import { generatePDF } from '../services/pdfService.js';
import { cloudinary } from '../config/cloudinary.config.js';

export const createDevis = async (req, res) => {
  try {
    const { userId, reference, montant, notes } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    const newDevis = new Devis({
      userId,
      reference,
      montant,
      notes,
      pdfUrl: req.file.path
    });

    await newDevis.save();
    res.status(201).json(newDevis);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getDevis = async (req, res) => {
  try {
    const devis = await Devis.find().populate('userId', 'name email');
    res.json(devis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDevis = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDevis = await Devis.findByIdAndDelete(id);
    
    if (!deletedDevis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    
    res.json({ message: 'Devis deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// In your devisController.js
export const getClientDevis = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const devis = await Devis.find({ userId })
      .sort({ date: -1 })
      .lean();

    if (!devis || devis.length === 0) {
      return res.status(200).json({
        userId,
        totalDevis: 0,
        devis: []
      });
    }

    res.status(200).json({
      userId,
      totalDevis: devis.length,
      devis: devis.map(d => ({
        id: d._id,
        reference: d.reference,
        montant: d.montant,
        notes: d.notes,
        pdfUrl: d.pdfUrl,
        status: d.status,
        date: d.date
      }))
    });
  } catch (err) {
    console.error('Error in getClientDevis:', err);
    res.status(500).json({ 
      message: 'Failed to fetch devis',
      error: err.message 
    });
  }
};
export const downloadDevisPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id);
    
    if (!devis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    
    if (!devis.pdfUrl) {
      return res.status(404).json({ message: 'PDF not found for this devis' });
    }

    // Get the PDF file from Cloudinary (or your storage)
    const response = await axios.get(devis.pdfUrl, {
      responseType: 'stream'
    });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${devis.reference || 'devis'}.pdf`);

    // Pipe the PDF file to the response
    response.data.pipe(res);
  } catch (err) {
    console.error('Error downloading PDF:', err);
    res.status(500).json({ message: 'Failed to download PDF', error: err.message });
  }
};
export const statDevis=async (req, res) => {
  try {
    const stats = await Devis.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } },
          totalAmount: { $sum: "$montant" },
          pendingAmount: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, "$montant", 0] } },
          approvedAmount: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, "$montant", 0] } },
          rejectedAmount: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, "$montant", 0] } }
        }
      },
      { $project: { _id: 0 } }
    ]);
    
    res.status(200).json(stats[0] || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      totalAmount: 0,
      pendingAmount: 0,
      approvedAmount: 0,
      rejectedAmount: 0
    });
  } catch (error) {
    console.error("Error fetching Devis stats:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};
export const updateDevisStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedDevis = await Devis.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedDevis) {
      return res.status(404).json({ message: 'Devis not found' });
    }

    res.json(updatedDevis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAcceptedDevis = async (req, res) => {
  try {
    const acceptedDevis = await Devis.find({ status: 'approved' })
      .populate('userId', 'name email company');
    res.json(acceptedDevis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const generateInvoice = async (req, res) => {
  try {
    const { devisId } = req.params;
    console.log('Generating invoice for devis:', devisId);

    if (!mongoose.Types.ObjectId.isValid(devisId)) {
      return res.status(400).json({ message: 'Invalid devis ID' });
    }

    const devis = await Devis.findById(devisId).populate('userId');
    if (!devis) {
      return res.status(404).json({ message: 'Devis not found' });
    }
    if (devis.status !== 'approved') {
      return res.status(400).json({ message: 'Devis not approved' });
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(devis);
    console.log('PDF generated successfully');

    // Upload PDF to Cloudinary
    const pdfUrl = await uploadPDFToCloudinary(pdfBuffer, `invoice_${devis.reference}`);
    console.log('PDF uploaded to:', pdfUrl);

    // Create invoice record
    const invoice = new Invoice({
      devisId: devis._id,
      clientId: devis.userId._id,
      reference: `INV-${Date.now()}`,
      amount: devis.montant,
      date: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: 'pending',
      pdfUrl: pdfUrl
    });

    await invoice.save();
    console.log('Invoice saved:', invoice);

    // Update devis
    devis.invoiced = true;
    devis.factureUrl = pdfUrl;
    await devis.save();

    // Prepare email content
    const client = devis.userId;
    const subject = `Your Invoice ${invoice.reference}`;
    
    const text = `Dear ${client.name},\n\nPlease find attached your invoice ${invoice.reference} for ${invoice.amount}€.\n\nDue date: ${invoice.dueDate.toLocaleDateString()}\n\nPayment link: https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002\n\nThank you for your business!\n\nBest regards,\nYour Company`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">Invoice ${invoice.reference}</h2>
        <p>Dear ${client.name},</p>
        <p>Please find attached your invoice <strong>${invoice.reference}</strong> for <strong>${invoice.amount}€</strong>.</p>
        <p><strong>Due date:</strong> ${invoice.dueDate.toLocaleDateString()}</p>
        
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4f46e5;">Payment Instructions</h3>
          <p>You can pay this invoice securely using our payment processor:</p>
          <a href="https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002" 
             style="display: inline-block; background: #4f46e5; color: white; 
                    padding: 12px 24px; border-radius: 4px; text-decoration: none;
                    font-weight: bold; margin: 10px 0;">
            Pay Now with Stripe
          </a>
        </div>

        <p>If you have any questions about this invoice, please reply to this email.</p>
        <p>Thank you for your business!</p>
        <p>Best regards,<br>Your Company</p>
      </div>
    `;

    // Prepare attachments
    const attachments = [{
      filename: `Invoice_${invoice.reference}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }];

    // Send email with all parameters
    await sendInvoiceEmail(
      client.email,  // to
      subject,      // subject
      text,         // text content
      html,         // html content
      attachments   // attachments array
    );

    console.log('Email sent successfully');

    res.status(201).json({
      message: 'Invoice generated and sent successfully',
      pdfUrl: pdfUrl
    });

  } catch (err) {
    console.error('Error in generateInvoice:', err);
    res.status(500).json({ 
      message: 'Failed to generate invoice',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Helper function to upload PDF to Cloudinary
const uploadPDFToCloudinary = async (pdfBuffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        resource_type: 'raw',
        public_id: publicId,
        format: 'pdf'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
};
export const sendEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id).populate('userId');
    
    if (!devis) {
      return res.status(404).json({ message: 'Devis not found' });
    }

    const invoice = await Invoice.findOne({ devisId: id });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const client = devis.userId;
    const subject = `Your Invoice ${invoice.reference}`;
    
    const text = `Dear ${client.name},\n\nPlease find attached your invoice ${invoice.reference} for ${invoice.amount}€.\n\nDue date: ${invoice.dueDate.toLocaleDateString()}\n\nPayment link: https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002\n\nThank you for your business!\n\nBest regards,\nYour Company`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">Invoice ${invoice.reference}</h2>
        <p>Dear ${client.name},</p>
        <p>Please find attached your invoice <strong>${invoice.reference}</strong> for <strong>${invoice.amount}€</strong>.</p>
        <p><strong>Due date:</strong> ${invoice.dueDate.toLocaleDateString()}</p>
        
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4f46e5;">Payment Instructions</h3>
          <p>You can pay this invoice securely using our payment processor:</p>
          <a href="https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002" 
             style="display: inline-block; background: #4f46e5; color: white; 
                    padding: 12px 24px; border-radius: 4px; text-decoration: none;
                    font-weight: bold; margin: 10px 0;">
            Pay Now with Stripe
          </a>
        </div>

        <p>If you have any questions about this invoice, please reply to this email.</p>
        <p>Thank you for your business!</p>
        <p>Best regards,<br>Your Company</p>
      </div>
    `;

    const attachments = [];
    // In production, add the PDF attachment here

    await sendInvoiceEmail(
      client.email,
      subject,
      text,
      html,
      attachments
    );

    res.json({ message: 'Invoice email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const downloadFacture = async (req, res) => {
  try {
    const { id } = req.params;
    const devis = await Devis.findById(id);
    
    if (!devis) {
      return res.status(404).json({ message: 'Devis not found' });
    }

    if (!devis.factureUrl) {
      return res.status(404).json({ message: 'Invoice not yet generated for this devis' });
    }

    // Get the PDF file from Cloudinary
    const response = await axios.get(devis.factureUrl, {
      responseType: 'stream'
    });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Facture_${devis.reference || 'facture'}.pdf`);

    // Pipe the PDF file to the response
    response.data.pipe(res);

  } catch (err) {
    console.error('Error downloading facture PDF:', {
      message: err.message,
      url: err.config?.url,  // Log the URL that failed
      status: err.response?.status
    });

    let errorMessage = 'Failed to download invoice';
    if (err.response?.status === 401) {
      errorMessage = 'Authentication failed - please try again later';
    } else if (err.response?.status === 404) {
      errorMessage = 'Invoice file not found in storage';
    }

    res.status(err.response?.status || 500).json({ 
      message: errorMessage,
      ...(process.env.NODE_ENV === 'development' && {
        detail: err.message
      })
    });
  }
};