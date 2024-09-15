import express from "express";
import userRoutes from "./user.routes";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);

export default router;
