import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, enum: ['prospect', 'devis_envoye', 'facture_envoyee', 'paye'], default: 'prospect' },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  amountToPay: Number,
});
export default mongoose.model('Client', clientSchema);
