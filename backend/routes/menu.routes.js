const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");

// CREATE menu item
router.post("/:restaurantId/create", menuController.createMenuItem);

// GET all menu items for restaurant
router.get("/:restaurantId/all", menuController.getMenuItems);

// UPDATE menu item
router.put("/:menuId", menuController.updateMenuItem);

// DELETE menu item
router.delete("/:menuId", menuController.deleteMenuItem);

module.exports = router;
