import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: { type: String },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
