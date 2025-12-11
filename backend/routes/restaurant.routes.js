const express = require("express");
const router = express.Router();
const restaurantController=require("../controllers/restaurant.controller")

// CREATE restaurant
router.post("/create", restaurantController.createRestaurant);

// READ all restaurants
router.get("/all", restaurantController.getRestaurants);

// READ one restaurant
router.get("/:id", restaurantController.getRestaurantById);

// UPDATE restaurant
router.put("/:id", restaurantController.updateRestaurantById);

// DELETE restaurant
router.delete("/:id", restaurantController.deleteRestaurantById);

module.exports = router;
