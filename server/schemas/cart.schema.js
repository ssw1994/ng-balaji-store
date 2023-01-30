import mongoose from "mongoose";
const { schema, modal } = require("mongoose");

const CartSchema = new schema({
  customer_id: { type: mongoose.SchemaTypes.ObjectId },
  items: [
    {
      product_id: { type: String, required: [true, "Product id is required"] },
      quntity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const CartModel = modal("carts", CartSchema);

module.exports = {
  CartSchema,
  CartModel,
};
