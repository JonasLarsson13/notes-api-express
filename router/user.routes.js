import express from "express";
import { signupUser, loginUser } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);

export default userRoutes;
