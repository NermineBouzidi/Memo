// server/server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // 👉 Import fetch pour appeler Ollama

// Charger les variables d'environnement
dotenv.config();

// Import de la connexion MongoDB
import connectDB from './config/mongodb.js';

// Import des routes existantes
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import statistiquesRouter from './routes/AdminRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import panierRoutes from './routes/panierRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import chatRoutes from './routes/chatRoutes.js';
// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 8080;

// Connexion à la base de données
connectDB();

// Middlewares globaux
app.use(express.json());
app.use(cookieParser());

// Configuration CORS
app.use((req, res, next) => {
  const origin = process.env.CLIENT_URL || 'https://memo-z241.vercel.app';

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Configuration spécifique pour Google Auth
  if (req.path === '/api/auth/google') {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  } else {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }

  next();
});

// Déclaration des routes API existantes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/review', reviewRouter);
app.use('/api/prod', statistiquesRouter);
app.use('/api/panier', panierRoutes);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/messages', messageRouter);
app.use('/api/stripe', stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
// 👉 ROUTE OLLAMA POUR TON CHATBOT
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('📝 Message reçu du frontend :', message);

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral', // tu peux aussi tester "llama3" ou autre modèle
        prompt: message,
        stream: true
      })
    });

    const raw = await response.text();
    let reply = '';
    raw.split('\n').forEach(line => {
      if (line.trim()) {
        const json = JSON.parse(line);
        if (json.response) reply += json.response;
      }
    });

    console.log('🤖 Réponse du modèle :', reply);
    res.json({ reply });
  } catch (err) {
    console.error('❌ Erreur Ollama :', err);
    res.status(500).json({ error: 'Erreur avec le modèle local' });
  }
});

// ✅ Servir le frontend React en production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/build');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is running (dev mode)');
  });
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
