import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.port || 5000;
import userRoutes from './routes/userRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js'; 
import cors from 'cors';

connectDB();

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/admin',adminRoutes);

app.get('/',(req,res) => res.send("Server is ready"))

app.use(notFound)
app.use(errorHandler)

app.listen(port,  ()=> console.log(`Server Running on Port ${port}`))