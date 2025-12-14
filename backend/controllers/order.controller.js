const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { restaurant, items, totalAmount } = req.body;

    const order = await Order.create({
      customer: req.user.id, 
      restaurant,
      items,
      totalPrice: totalAmount,
    });

    res.json({
      msg: "Order placed successfully",
      order
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = "cancelled";
    await order.save();

    res.json({ msg: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.getOrdersForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ msg: "Restaurant ID required" });
    }

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("customer", "email name")
      .populate("items.menuItem", "name price");

    res.json({ orders });
  } catch (err) {
    console.error("Restaurant Orders Error:", err);
    res.status(500).json({
      msg: "Failed to fetch restaurant orders",
      error: err.message,
    });
  }
};




exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ msg: "Status updated", order });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

exports.getOrdersForCustomer = async (req, res) => {
  try {
    const {customerId}=req.params;
    if (!customerId) {
      return res.status(400).json({ msg: "customer ID required" });
    }
    const orders = await Order.find({ customer: customerId })
      .populate("customer", "email name")
      .populate("items.menuItem", "name price");

    res.json({ orders });
  } catch (err) {
    console.error("Restaurant Orders Error:", err);
    res.status(500).json({
      msg: "Failed to fetch restaurant orders",
      error: err.message,
    });
  }
};


