import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './Routers/UserRouter';
import nodemon from 'nodemon';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(core())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});
app.use(bodyParser.json());

app.use("/api/User", UserRouter);

app.listen(5000, () => {    
    console.log("Server is running on port 5000");
});