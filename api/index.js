import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.Mongo).then(() => {
    console.log('Connected to DB!!!');
}).catch((err) => {
    console.log('error===>',err)
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('server is running 3000')
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);