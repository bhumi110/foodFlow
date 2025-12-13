const Restaurant = require("../models/Restaurant");
const Menu=require("../models/MenuItem");
const Order=require("../models/Order");
const User=require("../models/User");

// CREATE restaurant
exports.createRestaurant=async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.json({ success: true, restaurant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all restaurants
exports.getRestaurants=async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

// READ one restaurant
exports.getRestaurantById= async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    res.status(404).json({ error: "Restaurant not found" });
  }
};

//Get Restaurant by user
// exports.getRestaurantByUser = async (req, res) => {
//   const restaurant = await Restaurant.findOne({ owner: req.user.id });

//   if (!restaurant) {
//     return res.status(200).json(null);
//   }

//   res.json({
//     restaurantId: restaurant._id,
//     restaurant,
//   });
// };



// UPDATE restaurant
exports.updateRestaurantById= async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE restaurant
exports.deleteRestaurantById= async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//dashboard
// exports.restaurantDashboard= async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findOne({ owner: req.user.id });

//     if (!restaurant) return res.json({ hasRestaurant: false });

//     const totalOrders = await Order.countDocuments({ restaurant: restaurant._id });
//     const menuItems = await Menu.countDocuments({ restaurant: restaurant._id });
//     const revenueAgg = await Order.aggregate([
//       { $match: { restaurant: restaurant._id, status: "completed" } },
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//     ]);

//     res.json({
//       hasRestaurant: true,
//       totalOrders,
//       menuItems,
//       revenue: revenueAgg[0]?.total || 0,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };