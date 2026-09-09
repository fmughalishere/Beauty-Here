import express from 'express';
import { addProduct, listProducts, removeProduct } from '../controllers/productController.js';
import upload from '../Middleware/multer.js';

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove", removeProduct);

export default productRouter;
