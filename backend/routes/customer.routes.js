const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/restaurants", customerController.getAllRestaurants);

router.get("/restaurant/:id", customerController.getSingleRestaurant);

router.get("/menu/:restaurantId", customerController.getMenuByRestaurant);

module.exports = router;
