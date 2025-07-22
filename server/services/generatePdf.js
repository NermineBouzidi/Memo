const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoice = async (payment, client) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Create a temporary file path
    const invoicePath = path.join(
      __dirname,
      `../temp/invoice_${payment._id}.pdf`
    );

    // Ensure temp directory exists
    if (!fs.existsSync(path.dirname(invoicePath))) {
      fs.mkdirSync(path.dirname(invoicePath), { recursive: true });
    }

    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    // Add invoice header
    doc
      .fillColor('#444444')
      .fontSize(20)
      .text('Pegasio', 50, 50)
      .fontSize(10)
      .text('123 Rue des Entreprises', 50, 80)
      .text('75000 Paris, France', 50, 95)
      .text(`Facture N°: ${payment.paymentNumber}`, 50, 130)
      .text(`Date: ${new Date(payment.paymentDate).toLocaleDateString()}`, 50, 145)
      .moveDown();

    // Add client information
    doc
      .text(`Facturé à:`, 50, 200)
      .text(client.company, 50, 215)
      .text(client.address, 50, 230)
      .text(`${client.postalCode} ${client.city}`, 50, 245)
      .text(client.country, 50, 260)
      .moveDown();

    // Add invoice items table
    const invoiceTableTop = 330;

    doc.font('Helvetica-Bold');
    generateTableRow(
      doc,
      invoiceTableTop,
      'Description',
      'Montant',
      'Statut',
      'Date échéance'
    );
    doc.font('Helvetica');

    generateTableRow(
      doc,
      invoiceTableTop + 25,
      `Paiement pour commande ${payment.order ? payment.order.orderNumber : 'N/A'}`,
      `${payment.amount.toFixed(2)} €`,
      payment.status,
      new Date(payment.dueDate).toLocaleDateString()
    );

    // Add total amount
    doc
      .font('Helvetica-Bold')
      .text(`Total: ${payment.amount.toFixed(2)} €`, 50, 400)
      .font('Helvetica');

    // Add footer
    doc
      .fontSize(10)
      .text(
        'Merci pour votre confiance. Pour toute question concernant cette facture, veuillez contacter notre service client.',
        50,
        450,
        { align: 'center', width: 500 }
      );

    doc.end();

    writeStream.on('finish', () => {
      resolve(invoicePath);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
};

function generateTableRow(doc, y, description, amount, status, dueDate) {
  doc
    .fontSize(10)
    .text(description, 50, y)
    .text(amount, 280, y, { width: 90, align: 'right' })
    .text(status, 370, y, { width: 90, align: 'right' })
    .text(dueDate, 460, y, { width: 90, align: 'right' });
}