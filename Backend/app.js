import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';

import paymentRoutes from './routes/paymentRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import aiRouter from './routes/aiRoute.js';
import productRouter from './routes/productRoute.js';
import newsletterRouter from './routes/newsletterRoute.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Make sure we have a live DB connection before any route runs.
// (Needed in serverless: each cold start needs to (re)connect.)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

app.use('/api', paymentRoutes);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/product', productRouter);
app.use('/api/ai', aiRouter);
app.use('/api/newsletter', newsletterRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
