import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,PUT,POST,DELETE',
  })
);

app.use('/api/auth', authRouter);

app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log('Server listening on port 3000');
});
