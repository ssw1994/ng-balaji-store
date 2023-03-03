import mongoose from "mongoose";
import { AddressSchema } from "./address.schema";
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
  order_status: {
    type: String,
    enum: ["in_progress", "shipping", "delivered"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  shipping_address: { type: mongoose.SchemaType.ObjectId, ref: AddressSchema },
  billing_address: { type: mongoose.SchemaType.ObjectId, ref: AddressSchema },
});

const OrderModal = model("orders", OrderSchema);
module.exports = {
  OrderSchema,
  OrderModal,
};
