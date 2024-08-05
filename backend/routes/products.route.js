import express from "express"
import {  getProduct ,createProduct , deleteProduct , updateProduct} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products" , getProduct)
router.post("/products" , createProduct)
router.delete("/products/:id" , deleteProduct)
router.put("/products/:id" , updateProduct)


export default router;