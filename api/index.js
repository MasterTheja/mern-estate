import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.Mongo).then(() => {
    console.log('Connected to DB!!!');
}).catch((err) => {
    console.log('Not Connected to DB===>',err)
});

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('server is running 3000')
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const errorMsg = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        errorMsg,
    });
});