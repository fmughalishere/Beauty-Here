import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import aiRouter from './routes/aiRoute.js';
import productRouter from './routes/productRoute.js';
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/product', productRouter)
app.use('/api/ai', aiRouter);
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.listen(port, () => {
  console.log(`✅ Server started at: http://localhost:${port}`);
});
