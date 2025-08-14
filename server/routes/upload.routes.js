import express from 'express';
import { uploadDocument } from '../controllers/upload.controller.js';
const router = express.Router();
router.post('/', uploadDocument);
export default router;
