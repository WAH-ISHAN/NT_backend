import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./Routers/UserRouter.js";
import productRouter from "./Routers/ProductRouter.js";
import verifyJWT from "./middleware/auth.js";
import orderRouter from "./Routers/OrderRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import dashboardrouter from "./Routers/DashboardRouting.js";




dotenv.config();
const app = express();
app.use(cors());

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to the database");
	})
	.catch(() => {
		console.log("Connection failed");
	});

app.use(bodyParser.json());
app.use(verifyJWT);

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", dashboardrouter);

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
