import express from 'express';
import { CreateOrder, GetOrders, UpdateOrder } from '../Controles/OrderControl.js';


const orderRouter = express.Router();

orderRouter.post("/",CreateOrder)
orderRouter.get("/",GetOrders)
orderRouter.put("/:orderId",UpdateOrder)

export default orderRouter;