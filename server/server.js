import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import statistiquesRouter from './routes/AdminRouter.js';

import reviewRouter from './routes/reviewRoutes.js';
import dotenv from 'dotenv';
dotenv.config();



import productRouter from './routes/productRoutes.js';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

