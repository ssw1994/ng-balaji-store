const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: [true, "Product name is required"] },
  description: { type: String, required: [true, "Description is requred"] },
  price: { type: Number, required: [true, "Price is required"] },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number, required: [true, "Stock is required"] },
  brand: { type: String, required: [true, "Brand is required"] },
  category: { type: String, required: [true, "Category is required"] },
  thumbnail: { type: String },
  images: [String],
});

const ProductModel = model("products", ProductSchema);

module.exports = {
  ProductSchema,
  ProductModel,
};
