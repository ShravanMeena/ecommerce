import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from "../controllers/productController.js";
const router = express.Router();
import { protectRoute, admin } from "../middleware/authMiddleware.js";

// router.get("/", getProducts);
router.route("/").get(getProducts).post(protectRoute, admin, createProduct);
router.route("/:id/reviews").post(protectRoute, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, admin, deleteProductById)
  .put(protectRoute, admin, updateProduct);

router.get("/top/product", getTopRatedProducts);
export default router;
