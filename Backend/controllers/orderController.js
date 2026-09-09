import orderModel from "../models/orderModel.js";

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.user.id,
      items: req.body.items || [],
      amount: req.body.amount || 0,
      address: req.body.address || {},
      transactionId: req.body.transactionId || "N/A",
      status: "Paid",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log("Order Placing Error:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Fetching Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

export { placeOrder, userOrders };
