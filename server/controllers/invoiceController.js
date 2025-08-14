
import Invoice from '../models/Invoice.js';
import axios from "axios";

export const getClientInvoices = async (req, res) => {
  try {
    const { clientId } = req.params;
    const invoices = await Invoice.find({ clientId })
      .sort({ date: -1 })
      .lean();
    
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (!invoice.pdfUrl) {
      return res.status(404).json({ message: 'PDF not found for this invoice' });
    }

    // Fetch the PDF from Cloudinary
    const response = await axios({
      method: 'get',
      url: invoice.pdfUrl,
      responseType: 'stream'
    });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${invoice.reference}.pdf`);

    // Pipe the PDF directly to the response
    response.data.pipe(res);
    
  } catch (err) {
    console.error('Error downloading invoice PDF:', err);
    res.status(500).json({ 
      message: 'Failed to download invoice PDF',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};