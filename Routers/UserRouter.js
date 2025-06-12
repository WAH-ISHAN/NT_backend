import express from "express";
import {
  changePassword,
  getAllUsers,
  getProfile,
  googleLogin,
  loginUser,
  saveUser,
  sendOTP,
  updateProfile,
} from "../Controles/UserControl.js";
import verifyjwt from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/saveUser", saveUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.post("/sendmail", sendOTP);
userRouter.post("/changePass", changePassword);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/profile", verifyjwt, getProfile);
userRouter.put("/profile", verifyjwt, updateProfile);

export default userRouter;
