import express from 'express';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRouter from "./routes/message.route.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT ;

app.use('/api/auth', authRouter )
app.use('/api/message', messageRouter )


app.listen( PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});