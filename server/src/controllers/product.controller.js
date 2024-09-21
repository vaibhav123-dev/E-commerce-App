import { ApiError } from "../utils/ApiError.js";
import { Product } from "./../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, ratings, numReviews, images } =
      req.body;

    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      ratings,
      numReviews,
      images,
    });

    const savedProduct = await product.save();

    res.status(201).json(new ApiResponse(200, savedProduct, "Product Added Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong while adding the product");
  }
});

export { addProduct };
