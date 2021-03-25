import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsersByAdmin,
  getUserById,
  getUserProfile,
  registerUser,
  updateUserByAdmin,
  updateUserProfile,
} from "../controllers/userController.js";
import { protectRoute, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
// router.get("/profile", protectRoute, getUserProfile);

router.post("/", registerUser);
router.get("/", protectRoute, admin, getAllUsersByAdmin);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

router
  .route("/:id")
  .delete(protectRoute, admin, deleteUser)
  .get(protectRoute, admin, getUserById)
  .put(protectRoute, admin, updateUserByAdmin);

export default router;
