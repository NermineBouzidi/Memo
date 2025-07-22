import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Veuillez ajouter un nom'],
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['invoice', 'contract', 'technical', 'other'],
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'archived', 'pending'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DocumentModel = mongoose.models.Document || mongoose.model("Document", DocumentSchema);
export default Document;