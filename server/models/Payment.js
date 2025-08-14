import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  status: { type: String, enum: ['en_attente', 'paye'], default: 'en_attente' },
  stripeSessionId: String,
});
export default mongoose.model('Payment', paymentSchema);
