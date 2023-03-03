const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "products",
    required: [true, "Product id is required"],
  },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const CartSchema = new Schema({
  customer_id: { type: mongoose.Types.ObjectId, ref: "users" },
  items: [CartItemSchema],
  total_price: { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const CartModel = model("carts", CartSchema);

module.exports = {
  CartSchema,
  CartModel,
};
