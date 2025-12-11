const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Drinks", "Other"],
    default: "Other"
  },
  image: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
