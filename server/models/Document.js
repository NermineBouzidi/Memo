import mongoose from 'mongoose';
const documentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['devis', 'facture', 'contrat'] },
  url: String,
  name: String,
});
export default mongoose.model('Document', documentSchema);
