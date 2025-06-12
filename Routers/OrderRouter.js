import express from 'express';
import { CompleteOrder, CreateOrder, DeleteOrder, GetOrders, UpdateOrder,  } from '../Controles/OrderControl.js';

const orderRouter = express.Router();

orderRouter.post("/CreateOrder", CreateOrder);
orderRouter.get("/", GetOrders);
orderRouter.put("/:orderId/Update", UpdateOrder);
orderRouter.patch("/:orderId/complete", CompleteOrder);
orderRouter.delete("/:orderId/delete", DeleteOrder);

export default orderRouter;
