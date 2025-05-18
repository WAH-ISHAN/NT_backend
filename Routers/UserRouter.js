import express from "express";
import { googleLogin, loginUser, saveUser } from "../Controles/UserControl.js";

const userRouter = express.Router();

userRouter.post("/saveUser",saveUser)
userRouter.post("/login",loginUser)
userRouter.post("/google",googleLogin)

export default userRouter;