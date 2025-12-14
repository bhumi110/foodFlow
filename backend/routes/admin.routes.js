const express = require("express");
const router = express.Router();
const adminController=require("../controllers/admin.controller");

router.post("/login", adminController.adminLogin);

router.get("/users",adminController.allUsers);

router.get("/restaurants",adminController.allRestaurants);

router.get("/orders",adminController.allOrders);

module.exports = router;

