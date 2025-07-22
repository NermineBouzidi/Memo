import express from 'express';
import {
  getDocuments,
  getDocumentsByType,
  uploadDocument,
  downloadDocument,
  deleteDocument,
} from '../controllers/documentController.js';
import { protect } from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', protect, getDocuments);
router.get('/:type', protect, getDocumentsByType);
router.post('/', protect, uploadDocument);
router.get('/:id/download', protect, downloadDocument);
router.delete('/:id', protect, deleteDocument);

export default documentroutes;