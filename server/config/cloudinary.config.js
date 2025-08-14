// config/cloudinary.config.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devis_pdf',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      return `devis-${uniqueSuffix}`;
    }
  }
});

const parser = multer({ storage });

export { cloudinary, parser };