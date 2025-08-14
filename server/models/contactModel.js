import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  societe: { type: String, required: true },
  fonction: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  objet: { type: String, required: true },
  autreObjet: { type: String, default: '' },
  collaborateurs: { type: String, required: true },
  message: { type: String, required: true },
  fileUrl: { type: String, default: null }, // New field for file URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Contact', contactSchema);