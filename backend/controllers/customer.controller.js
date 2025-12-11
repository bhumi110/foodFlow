const Restaurant = require("../models/Restaurant");
const Menu = require("../models/MenuItem");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json({ restaurants });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    res.json({ restaurant });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};


exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await Menu.find({ restaurant: restaurantId });

    res.json({ menu: menuItems });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
