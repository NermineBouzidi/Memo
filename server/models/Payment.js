const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['Carte bancaire', 'Virement', 'Espèces'],
    required: true
  },
  status: {
    type: String,
    default: 'Complet'
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);