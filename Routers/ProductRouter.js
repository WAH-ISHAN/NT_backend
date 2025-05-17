import express from 'express';
import { CreateProduct, DeleteProduct, getProductId, getProducts, UpdateProduct } from '../Controles/ProductControl.js';

const productRouter = express.Router();

productRouter.post("/",CreateProduct)
productRouter.get("/",getProducts)
productRouter.get("/:id",getProductId)
productRouter.delete("/:productId",DeleteProduct)
productRouter.put("/:productId",UpdateProduct)


export default productRouter;