import orderModel from "../models/orderModel.js";
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.userId, 
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log("Order Placing Error:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetching User Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
}

export { placeOrder, userOrders };