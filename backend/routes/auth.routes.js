const express = require("express");
const router = express.Router();
const userController=require("../controllers/auth.controller");

// SIGNUP
router.post("/signup", userController.signup);

// LOGIN
router.post("/login", userController.login );

router.post("/admin/login", userController.adminLogin);

module.exports = router;
