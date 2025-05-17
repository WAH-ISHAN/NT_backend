import express from 'express';
import { } from '../controllers/productController.js';
import { CreateProduct, DeleteProduct, getProductById, getProductId, getProducts, UpdateProduct } from '../Controles/ProductControl.js';

const productRouter = express.Router();

productRouter.post("/",CreateProduct)
productRouter.get("/",getProducts)
productRouter.get("/:id",getProductId)
productRouter.delete("/:productId",DeleteProduct)
productRouter.put("/:productId",UpdateProduct)


export default productRouter;