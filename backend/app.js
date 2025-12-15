const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ["http://localhost:5173","https://foodflow-lzfy.onrender.com"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("FoodFlow API is running 🚀");
});


const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const restaurantRoutes = require("./routes/restaurant.routes");
app.use("/restaurant", restaurantRoutes);

const menuRoutes = require("./routes/menu.routes");
app.use("/menu", menuRoutes);

const customerRoutes=require("./routes/customer.routes")
app.use("/customer", customerRoutes );

const orderRoutes=require("./routes/order.routes")
app.use("/order", orderRoutes);

const adminRoutes=require("./routes/admin.routes");
app.use("/admin",adminRoutes);

module.exports = app;