import express from 'express';
import axios from 'axios';
import multer from 'multer';
import path from 'path';
import Contact from '../models/contactModel.js';
import sendContactConfirmationEmail  from '../config/emailcontact.js';

const router = express.Router();

// Configure Multer for local file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé. Seuls PDF, DOC, DOCX, JPG, PNG sont acceptés.'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post('/', upload.single('file'), async (req, res) => {
  console.log('Received request to /api/contact:', { body: req.body, file: req.file });
  const { nom, prenom, societe, fonction, email, telephone, objet, autreObjet, collaborateurs, message, captcha } = req.body;

  // Vérification des champs obligatoires
  if (!nom || !prenom || !societe || !fonction || !email || !telephone || !objet || !collaborateurs || !message || !captcha) {
    console.log('Missing fields:', { nom, prenom, societe, fonction, email, telephone, objet, collaborateurs, message, captcha });
    return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
  }

  // Vérification reCAPTCHA
  try {
    console.log('Verifying reCAPTCHA with secret:', process.env.RECAPTCHA_SECRET_KEY);
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captcha,
      },
    });
    console.log('reCAPTCHA response:', response.data);

    if (!response.data.success) {
      return res.status(400).json({ error: 'Échec de la vérification reCAPTCHA' });
    }
  } catch (error) {
    console.error('reCAPTCHA error:', error.message);
    return res.status(500).json({ error: 'Erreur serveur lors de la vérification reCAPTCHA' });
  }

  // Handle file upload (local storage)
  let fileUrl = null;
  try {
    if (req.file) {
      fileUrl = `${process.env.ASSET_BASE_URL || 'http://localhost:8080'}/uploads/${req.file.filename}`;
    }
  } catch (error) {
    console.error('File upload error:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
  }

  // Enregistrement dans MongoDB
  try {
    const contact = new Contact({
      nom,
      prenom,
      societe,
      fonction,
      email,
      telephone,
      objet,
      autreObjet: objet === 'Autre demande' ? autreObjet : '',
      collaborateurs,
      message,
      fileUrl,
    });
    await contact.save();

    // Envoi de l'e-mail via la fonction appropriée
    const ticketId = contact._id.toString();
    const isDemoRequest = objet.toLowerCase().includes('démo') || objet.toLowerCase().includes('présentation');
    const emailOptions = {
      userEmail: email,
      message,
      ticketId,
      status: isDemoRequest ? 'demo-request' : 'open',
      isDemo: isDemoRequest,
      metadata: {
        name: `${prenom} ${nom}`,
        company: societe,
        sector: fonction,
        phone: telephone,
      },
      fileUrl,
    };

    await sendContactConfirmationEmail(emailOptions);
    res.status(200).json({ message: 'Demande envoyée et enregistrée avec succès' });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ error: 'Erreur lors du traitement de la demande' });
  }
});

export default router;