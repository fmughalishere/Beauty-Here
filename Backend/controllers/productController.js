import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Product image is required" });
    }

    // Store the image as a base64 data URI directly in MongoDB instead of
    // on local disk - serverless hosts don't offer a persistent filesystem.
    const imageDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: imageDataUri
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
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log("Error removing product:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export { addProduct, listProducts, removeProduct };
