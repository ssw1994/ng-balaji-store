const mongoose = require("mongoose");
const { AddressSchema } = require("./address.schema");
const { model, Schema } = require("mongoose");

const OrderSchema = new Schema({
  customer_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "Customer id is required"],
  },
  items: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: [true, "Product id is required"],
      },
      quntity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  order_status: {
    type: String,
    enum: ["in_progress", "shipping", "delivered"],
    default: "in_progress",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  shipping_address: AddressSchema,
  billing_address: AddressSchema,
  payment_method: {
    type: String,
    enum: ["netbanking", "upi", "cards", "cod"],
    default: "cod",
  },
});

const OrderModel = model("orders", OrderSchema);
module.exports = {
  OrderSchema,
  OrderModel,
};
