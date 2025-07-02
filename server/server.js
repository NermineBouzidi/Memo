import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
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


//for review
app.use('/api/review', reviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

