import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  devisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devis',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  pdfUrl: {
    type: String
  }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;