import productModel from "../models/productModel.js";
import fs from 'fs';

const addProduct = async (req, res) => {
    let image_filename = req.file.filename;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await product.save();
        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log("Error listing products:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => {});

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log("Error removing product:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
}


export { addProduct, listProducts, removeProduct };