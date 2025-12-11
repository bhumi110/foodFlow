const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware= require("../middleware/auth.middleware");

// Customer psnel
router.post("/create",authMiddleware, orderController.createOrder);
router.put("/cancel/:id", orderController.cancelOrder);

// Restaurant panel
router.get("/restaurant/:restaurantId", orderController.getOrdersForRestaurant);
router.put("/status/:id", orderController.updateOrderStatus);

module.exports = router;



// {
// 
//   "restaurant": "693ac29951395bcea08fe995",
//   "items": [
//     { "menuItem": "693ac56b7303e6a711e9f480", "quantity": 2 },
//   ],
//   "totalPrice": 450
// }