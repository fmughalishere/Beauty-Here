import express from "express";
import { placeOrder, userOrders } from "../controllers/orderController.js";
import authMiddleware from "../Middleware/Auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);

router.get("/user-orders", authMiddleware, userOrders);

export default router;
