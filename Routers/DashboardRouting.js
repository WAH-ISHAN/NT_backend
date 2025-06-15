import express from "express";
import { getDashboardStats } from "../Controles/DashboardControl.js";



const dashboardrouter = express.Router();

dashboardrouter.get("/dashboard", getDashboardStats);

export default dashboardrouter;
