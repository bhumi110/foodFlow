const User=require("../models/User");
const Restaurant=require("../models/Restaurant");
const Order=require("../models/Order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign(
      { role: "Admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      msg: "Login successful",
      token,
      user: {
        name: "Admin",
        email,
        role: "Admin",
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};



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
