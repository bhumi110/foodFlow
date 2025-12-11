const Menu = require("../models/MenuItem");

// CREATE
exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const newItem = await Menu.create({
      restaurant: restaurantId,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: newItem
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL
exports.getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const items = await Menu.find({ restaurant: restaurantId });

    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.updateMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;

    const updated = await Menu.findByIdAndUpdate(menuId, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Menu item not found" });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;

    const deleted = await Menu.findByIdAndDelete(menuId);

    if (!deleted) return res.status(404).json({ message: "Menu item not found" });

    res.json({ success: true, message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
