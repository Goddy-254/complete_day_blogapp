import express from "express";
import { loginAdmin, adminData } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//login admin
router.post("/admin-login", loginAdmin);

//admin data
router.get(
  "/admin-data",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  adminData
);

export default router;