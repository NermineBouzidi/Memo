import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 
import productRoutes from './routes/productRoutes.js';
import statistiquesRouter from './routes/AdminRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import panierRoutes from "./routes/panierRoutes.js";
import newsletterRouter from './routes/newsletterRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import supportRouter from './routes/supportRoutes.js'; // Added support routes
import dotenv from 'dotenv';
import crypto from 'crypto';
import chatRoutes from './routes/chatRoutes.js';
import demoRoutes from "./routes/demoRoutes.js";
import contactRoutes from './routes/contactRoutes.js'; // Nouvelle route ajoutée
import path from "path";
import devisRouter from './routes/devisRoutes.js';
import invoiceRouter from './routes/InvoiceRoute.js';
import clientStatsRouter from './routes/clientStats.routes.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8080;

// Connexion à la base de données
connectDB();
const generateTawkHash = (userId) => {
  const secret = process.env.TAWKTO_SECRET;
  return crypto.createHash('md5').update(userId + secret).digest('hex');
};

// ✅ Middleware CORS (AVANT les routes)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-token'], // Autorise x-token
}));

// Middleware JSON & cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Headers de sécurité (optionnels mais gardés)
app.use((req, res, next) => {
  if (req.path === '/api/auth/google') {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  } else {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  next();
});
app.use("/assets", express.static(path.join(process.cwd(), "public/assets")));
// In server.js, add this line with other middleware
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/review', reviewRouter);
app.use('/api/prod', statistiquesRouter);
app.use("/api/panier", panierRoutes);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/messages', messageRouter);
app.use('/api/support', supportRouter); // Added support route
app.use("/api/chat", chatRoutes);
app.use("/api/demo", demoRoutes);
app.use('/api/contact', contactRoutes); // Nouvelle route ajoutée
app.use('/api/devis', devisRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/client-stats', clientStatsRouter);


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

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
