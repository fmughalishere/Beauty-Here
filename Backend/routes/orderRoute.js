import express from 'express';
import authMiddleware from '../Middleware/Auth.js';
import { placeOrder, userOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/user-orders", authMiddleware, userOrders);

export default orderRouter;