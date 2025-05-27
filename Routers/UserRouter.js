import express from "express";
import { googleLogin, loginUser, saveUser, sendOTP } from "../Controles/UserControl.js";

const userRouter = express.Router();

userRouter.post("/saveUser",saveUser)
userRouter.post("/login",loginUser)
userRouter.post("/google",googleLogin)
userRouter.post("/sendmail",sendOTP)

export default userRouter;