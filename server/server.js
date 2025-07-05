import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 
import productRouter from './routes/ProductRoutes.js'; 
import statistiquesRouter from './routes/AdminRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';
import newsletterScheduler from './services/newsletterScheduler.js';
import dotenv from 'dotenv';
dotenv.config();





const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true, origin: process.env.CLIENT_URL}));

//api endpoints
app.get('/', (req, res) => {res.send('Server is running');    });
app.use('/api/auth', authRouter);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
//for review
app.use('/api/review', reviewRouter);
//for statistiques 
app.use('/api/prod', statistiquesRouter);
//for newsletter
app.use('/api/newsletter', newsletterRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Start newsletter scheduler
  newsletterScheduler.startScheduler();
});

