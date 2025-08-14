import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDF = async (devis) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Add PDF content
      doc.fontSize(20).text(`Invoice ${devis.reference}`, { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(14).text(`Client: ${devis.userId.name}`);
      if (devis.userId.company) {
        doc.text(`Company: ${devis.userId.company}`);
      }
      doc.moveDown();
      
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Due Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
      doc.moveDown();
      
      // Add items table
      doc.fontSize(12).text('Description', 50, doc.y);
      doc.text('Amount', 400, doc.y, { width: 100, align: 'right' });
      doc.moveDown();
      doc.text('_________________________________________________________');
      doc.moveDown();
      
      // For each item in devis (you'll need to adjust based on your devis structure)
      doc.text('Services', 50, doc.y);
      doc.text(`${devis.montant} €`, 400, doc.y, { width: 100, align: 'right' });
      doc.moveDown();
      
      doc.text('_________________________________________________________');
      doc.moveDown();
      
      doc.text('Total', 50, doc.y, { bold: true });
      doc.text(`${devis.montant} €`, 400, doc.y, { width: 100, align: 'right', bold: true });
      doc.moveDown(2);
      
      // Add payment instructions
      doc.text('Payment Instructions:');
      doc.text('Please pay using the following link: https://buy.stripe.com/test_00wfZa7Dr9Ti85r3fD24002');
      
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};