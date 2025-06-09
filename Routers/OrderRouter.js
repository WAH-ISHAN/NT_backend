import express from 'express';
import { CompleteOrder, CreateOrder, DeleteOrder, GetOrders, UpdateOrder,  } from '../Controles/OrderControl.js';

const orderRouter = express.Router();

orderRouter.post("/CreateOrder", CreateOrder);
orderRouter.get("/", GetOrders);
orderRouter.put("/:orderId", UpdateOrder);

// Add this route to mark order as completed
orderRouter.patch("/:orderId/complete", CompleteOrder);

// Add this route to delete order
orderRouter.delete("/:orderId", DeleteOrder);

export default orderRouter;
