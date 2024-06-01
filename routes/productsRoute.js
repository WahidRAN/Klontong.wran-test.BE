import express from "express";
import {
	getAllProducts,
  getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productsController.js";
import tokenAuth from "../middleware/tokenAuth.js";
const router = express.Router();

router.get("/", tokenAuth, getAllProducts);
router.get("/:id", tokenAuth, getProductById);
router.post("/add", tokenAuth, createProduct);
router.put("/update/:id", tokenAuth, updateProduct);
router.delete("/delete/:id", tokenAuth, deleteProduct);

export default router;
