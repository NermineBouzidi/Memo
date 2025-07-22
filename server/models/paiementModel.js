import mongoose from "mongoose";
import paiementroutes from "../routes/paiementRoutes";

const PaymentSchema = new mongoose.Schema({
  paymentNumber: {
    type: String,
    required: [true, 'Veuillez ajouter un numéro de paiement'],
    unique: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'check'],
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'cancelled'],
    default: 'pending',
  },
  transactionId: {
    type: String,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  invoice: {
    type: String,
  },
});

const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default Paiement;