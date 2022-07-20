import express from "express"
const router = express.Router()
import { createProductReview,getProductById, getProducts,deleteProduct,createProduct,updateProduct } from "../controllers/productController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

router.get("/",getProducts)
router.post("/:id/reviews",protect,createProductReview)
router.post("/",protect,admin,createProduct)
router.get("/:id",getProductById)
router.delete("/:id",protect,admin,deleteProduct)
router.put("/:id",protect,admin,updateProduct)

export default router