const User=require("../models/User");
const Restaurant=require("../models/Restaurant");
const Order=require("../models/Order");



exports.allUsers=async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.allRestaurants= async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.allOrders= async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
