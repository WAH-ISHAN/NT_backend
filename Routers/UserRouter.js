import express from "express";
import { changePassword, getAllUsers, googleLogin, loginUser, saveUser, sendOTP } from "../Controles/UserControl.js";


const userRouter = express.Router();

userRouter.post("/saveUser",saveUser)
userRouter.post("/login",loginUser)
userRouter.post("/google",googleLogin)
userRouter.post("/sendmail",sendOTP)
userRouter.post("/changePass", changePassword)
userRouter.get("/allusers",getAllUsers)


export default userRouter;