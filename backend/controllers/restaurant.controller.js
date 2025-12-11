const Restaurant = require("../models/Restaurant");

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