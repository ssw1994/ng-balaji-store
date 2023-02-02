const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  customer_id: { type: mongoose.SchemaTypes.ObjectId },
  items: [
    {
      product_id: { type: String, required: [true, "Product id is required"] },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const CartModel = model("carts", CartSchema);

module.exports = {
  CartSchema,
  CartModel,
};
