import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Enregistrer un message
router.post('/', async (req, res) => {
  try {
    const { content, sender } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Le contenu du message est requis' });
    }
    const message = new Message({ content, sender });
    await message.save();
    res.status(201).json({ message: 'Message enregistré', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Récupérer tous les messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;