import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, default: 'user' }, // 'user' ou 'support'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Lien vers l'utilisateur
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);