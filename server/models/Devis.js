import mongoose from 'mongoose';

const devisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  pdfUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  invoiced: {
    type: Boolean,
    default: false
  },
  factureUrl: {
    type: String
  }
});

const Devis = mongoose.model('Devis', devisSchema);

export default Devis;