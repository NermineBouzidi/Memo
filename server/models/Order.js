const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['En cours', 'Livré', 'Annulé'],
    default: 'En cours'
  },
  amount: {
    type: Number,
    required: true
  },
  items: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);