import { Router } from "express";
import { verifyJWT, isAdminRoute } from "./../middlewares/auth.middleware.js";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "./../middlewares/multer.middleware.js";

const router = Router();

//secured routes
router.route("/add-product").post(verifyJWT, isAdminRoute, upload.array("images"), addProduct);

export default router;
