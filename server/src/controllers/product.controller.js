import { ApiError } from "../utils/ApiError.js";
import { Product } from "./../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, ratings, numReviews, images } =
      req.body;

    // Check if the category exists or create it if it doesn't
    let categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      // If the category doesn't exist, create a new one
      categoryExists = new Category({
        name: category,
        description: `Category for ${category}`,
      });
      await categoryExists.save();
    }

    let fileUrls;

    if (req.files && req.files.length > 0) {
      // Use Promise.all to upload all files concurrently
      const uploadedFiles = await Promise.all(
        req.files.map((file) => uploadOnCloudinary(file.path))
      );

      // Filter out null responses in case any upload failed
      const validUploads = uploadedFiles.filter((file) => file !== null);

      // Collect secure URLs of successfully uploaded files
      fileUrls = validUploads.map((upload) => upload.secure_url);
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category: categoryExists._id,
      brand,
      stock,
      ratings,
      numReviews,
      images: fileUrls,
    });

    const savedProduct = await product.save();

    res.status(201).json(new ApiResponse(200, savedProduct, "Product Added Successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong while adding the product");
  }
});

export { addProduct };
