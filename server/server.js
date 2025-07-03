import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import { register } from './controllers/authController.js';

const app = express();
const PORT =  8080;
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true,origin:'http://localhost:5173'}));
//api endpoints


app.get('/', (req, res) => {res.send('Server is running');    });
app.use('/api/auth/signup',register);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});