import express from 'express';
import { CreateProduct, DeleteProduct, getProductId, getProducts, searchProduct, UpdateProduct } from '../Controles/ProductControl.js';

const productRouter = express.Router();

productRouter.post("/Create",CreateProduct)
productRouter.get("/getProducts",getProducts)
productRouter.get("/:id",getProductId)
productRouter.delete("/:productId",DeleteProduct)
productRouter.put("/:productId",UpdateProduct)



export default productRouter;