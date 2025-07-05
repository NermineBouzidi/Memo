import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: String, default: 'user' }, // 'user' ou 'support'
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);