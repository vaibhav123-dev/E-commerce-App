import { Router } from "express";
import { verifyJWT, isAdminRoute } from "./../middlewares/auth.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = Router();

//secured routes
router.route("/add-product").post(verifyJWT, isAdminRoute, addProduct);

export default router;
