import mongoose from "mongoose";
const { model, schema } = require("mongoose");

const OrderSchema = new schema({
  customer_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "Customer id is required"],
  },
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

const OrderModal = model("orders", OrderSchema);
module.exports = {
  OrderSchema,
  OrderModal,
};
