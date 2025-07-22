import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/async.js';
import Document from '../models/documentModel.js';
import userModel from '../models/userModel.js';
import { uploadFile, deleteFile } from '../services/storageService.js';

// 📂 Obtenir tous les documents d'un client
export const getDocuments = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });
  
  const documents = await Document.find({ client: client._id }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: documents.length,
    data: documents,
  });
});

// 🗂 Obtenir les documents par type
export const getDocumentsByType = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const documents = await Document.find({
    client: client._id,
    type: req.params.type,
  }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: documents.length,
    data: documents,
  });
});

// ⬆️ Uploader un document
export const uploadDocument = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  if (!req.files || !req.files.file) {
    return next(new ErrorResponse('Veuillez uploader un fichier', 400));
  }

  const file = req.files.file;

  // Uploader le fichier dans le stockage
  const fileUrl = await uploadFile(file, 'documents');

  const document = await Document.create({
    client: client._id,
    name: req.body.name || file.name,
    type: req.body.type || 'other',
    fileUrl,
    fileType: file.mimetype,
    fileSize: file.size,
    tags: req.body.tags ? req.body.tags.split(',') : [],
  });

  res.status(201).json({
    success: true,
    data: document,
  });
});

// ⬇️ Télécharger un document
export const downloadDocument = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const document = await Document.findOne({
    _id: req.params.id,
    client: client._id,
  });

  if (!document) {
    return next(
      new ErrorResponse(`Document non trouvé avec l'id ${req.params.id}`, 404)
    );
  }

  res.status(200).download(document.fileUrl, document.name);
});

// 🗑 Supprimer un document
export const deleteDocument = asyncHandler(async (req, res, next) => {
  const client = await Client.findOne({ user: req.user.id });

  const document = await Document.findOneAndDelete({
    _id: req.params.id,
    client: client._id,
  });

  if (!document) {
    return next(
      new ErrorResponse(`Document non trouvé avec l'id ${req.params.id}`, 404)
    );
  }

  // Supprimer le fichier du stockage
  await deleteFile(document.fileUrl);

  res.status(200).json({
    success: true,
    data: {},
  });
});