import express from "express";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
// router.use("/product", taskRoutes);

export default router;
